#!/bin/bash

# Exit on error
set -e

# AWS Configuration
ECR_REPO="054367266295.dkr.ecr.us-east-1.amazonaws.com"
IMAGE_NAME="baka-v1"
REGION="us-east-1"
CLUSTER_NAME="baka-v1-cluster"
SERVICE_NAME="baka-v1-service"
STACK_NAME="baka-v1-stack-new"

# Database Configuration
DB_HOST="localhost"
DB_NAME="company_dating"
DB_USER="postgres"
DB_PASSWORD="postgres"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command_exists aws; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

if ! command_exists docker; then
    echo -e "${RED}Docker is not installed. Please install it first.${NC}"
    exit 1
fi

# Check AWS credentials
echo -e "${YELLOW}Checking AWS credentials...${NC}"
if ! aws sts get-caller-identity >/dev/null 2>&1; then
    echo -e "${RED}AWS credentials are not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${YELLOW}Starting deployment process...${NC}"

# Create ECR repository if it doesn't exist
echo -e "${YELLOW}Checking ECR repository...${NC}"
if ! aws ecr describe-repositories --repository-names $IMAGE_NAME --region $REGION >/dev/null 2>&1; then
    echo -e "${YELLOW}Creating ECR repository...${NC}"
    aws ecr create-repository --repository-name $IMAGE_NAME --region $REGION
fi

# Create or update CloudFormation stack
echo -e "${YELLOW}Creating/Updating CloudFormation stack...${NC}"
aws cloudformation deploy \
    --template-file cloudformation.yml \
    --stack-name $STACK_NAME \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides \
        DatabaseHost=$DB_HOST \
        DatabaseName=$DB_NAME \
        DatabaseUser=$DB_USER \
        DatabasePassword=$DB_PASSWORD \
    --region $REGION || {
        echo -e "${RED}Failed to deploy CloudFormation stack.${NC}"
        echo -e "${YELLOW}Please make sure you have the necessary permissions in AWS Console.${NC}"
        echo -e "${YELLOW}You can attach the policy from iam-policy.json through the AWS Console.${NC}"
        exit 1
    }

# Get the load balancer DNS
echo -e "${YELLOW}Getting load balancer DNS...${NC}"
LOAD_BALANCER_DNS=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerDNS`].OutputValue' \
    --output text \
    --region $REGION) || {
        echo -e "${RED}Failed to get load balancer DNS.${NC}"
        exit 1
    }

# Login to ECR
echo -e "${YELLOW}Logging in to Amazon ECR...${NC}"
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO || {
    echo -e "${RED}Failed to login to ECR.${NC}"
    exit 1
}

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $IMAGE_NAME . || {
    echo -e "${RED}Failed to build Docker image.${NC}"
    exit 1
}

# Tag the image
echo -e "${YELLOW}Tagging image for ECR...${NC}"
docker tag $IMAGE_NAME:latest $ECR_REPO/$IMAGE_NAME:latest || {
    echo -e "${RED}Failed to tag Docker image.${NC}"
    exit 1
}

# Push the image
echo -e "${YELLOW}Pushing image to ECR...${NC}"
docker push $ECR_REPO/$IMAGE_NAME:latest || {
    echo -e "${RED}Failed to push Docker image.${NC}"
    exit 1
}

# Deploy to ECS
echo -e "${YELLOW}Deploying to ECS...${NC}"

# Create CloudWatch Logs group if it doesn't exist
aws logs create-log-group --log-group-name /ecs/$IMAGE_NAME --region $REGION || true

# Update ECS service
aws ecs update-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --force-new-deployment \
    --region $REGION || {
        echo -e "${RED}Failed to update ECS service.${NC}"
        exit 1
    }

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Waiting for service to stabilize...${NC}"

# Wait for service to stabilize
aws ecs wait services-stable \
    --cluster $CLUSTER_NAME \
    --services $SERVICE_NAME \
    --region $REGION || {
        echo -e "${RED}Service failed to stabilize.${NC}"
        exit 1
    }

echo -e "${GREEN}Service is now stable!${NC}"
echo -e "${YELLOW}You can access your application at:${NC}"
echo -e "http://$LOAD_BALANCER_DNS"

# Next step: Fetch detailed error log for the CloudFormation stack
echo -e "${YELLOW}Fetching CloudFormation stack events...${NC}"
aws cloudformation describe-stack-events --stack-name baka-v1-stack-new 