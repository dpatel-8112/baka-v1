#!/bin/bash

# AWS Configuration
STACK_NAME="baka-v1-stack"
REGION="us-east-1"
CLUSTER_NAME="baka-v1-cluster"
SERVICE_NAME="baka-v1-service"
IMAGE_NAME="baka-v1"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting cleanup process...${NC}"

# Check stack status
STACK_STATUS=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query 'Stacks[0].StackStatus' --output text --region $REGION 2>/dev/null || echo "STACK_NOT_FOUND")

if [ "$STACK_STATUS" = "DELETE_FAILED" ]; then
    echo -e "${YELLOW}Stack is in DELETE_FAILED state. Retaining resources and retrying deletion...${NC}"
    
    # Retain resources and retry deletion
    aws cloudformation delete-stack \
        --stack-name $STACK_NAME \
        --retain-resources "ECRRepository" "CloudWatchLogGroup" \
        --region $REGION || true
else
    # Delete ECS Service
    echo -e "${YELLOW}Deleting ECS Service...${NC}"
    aws ecs update-service \
        --cluster $CLUSTER_NAME \
        --service $SERVICE_NAME \
        --desired-count 0 \
        --region $REGION || true

    aws ecs delete-service \
        --cluster $CLUSTER_NAME \
        --service $SERVICE_NAME \
        --region $REGION || true

    # Delete ECS Cluster
    echo -e "${YELLOW}Deleting ECS Cluster...${NC}"
    aws ecs delete-cluster \
        --cluster $CLUSTER_NAME \
        --region $REGION || true

    # Delete CloudFormation Stack
    echo -e "${YELLOW}Deleting CloudFormation Stack...${NC}"
    aws cloudformation delete-stack \
        --stack-name $STACK_NAME \
        --region $REGION || true
fi

echo -e "${YELLOW}Waiting for stack deletion to complete...${NC}"
aws cloudformation wait stack-delete-complete \
    --stack-name $STACK_NAME \
    --region $REGION || true

# Delete ECR Repository
echo -e "${YELLOW}Deleting ECR Repository...${NC}"
aws ecr delete-repository \
    --repository-name $IMAGE_NAME \
    --force \
    --region $REGION || true

# Delete CloudWatch Log Groups
echo -e "${YELLOW}Deleting CloudWatch Log Groups...${NC}"
aws logs delete-log-group \
    --log-group-name /ecs/$IMAGE_NAME \
    --region $REGION || true

echo -e "${GREEN}Cleanup completed successfully!${NC}" 