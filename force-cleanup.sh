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

echo -e "${YELLOW}Starting force cleanup process...${NC}"

# Get all resources in the stack
echo -e "${YELLOW}Getting stack resources...${NC}"
RESOURCES=$(aws cloudformation list-stack-resources \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'StackResourceSummaries[?ResourceStatus!=`DELETE_COMPLETE`].[LogicalResourceId,ResourceType,PhysicalResourceId]' \
    --output text 2>/dev/null || echo "")

if [ ! -z "$RESOURCES" ]; then
    echo -e "${YELLOW}Found resources to clean up:${NC}"
    echo "$RESOURCES"
    
    # Delete each resource manually
    while IFS=$'\t' read -r logical_id resource_type physical_id; do
        if [ ! -z "$physical_id" ]; then
            echo -e "${YELLOW}Deleting resource: $logical_id ($resource_type)${NC}"
            
            case $resource_type in
                "AWS::ECS::Service")
                    aws ecs update-service \
                        --cluster $CLUSTER_NAME \
                        --service $physical_id \
                        --desired-count 0 \
                        --region $REGION || true
                    aws ecs delete-service \
                        --cluster $CLUSTER_NAME \
                        --service $physical_id \
                        --region $REGION || true
                    ;;
                "AWS::ECS::Cluster")
                    aws ecs delete-cluster \
                        --cluster $physical_id \
                        --region $REGION || true
                    ;;
                "AWS::ECR::Repository")
                    aws ecr delete-repository \
                        --repository-name $physical_id \
                        --force \
                        --region $REGION || true
                    ;;
                "AWS::Logs::LogGroup")
                    aws logs delete-log-group \
                        --log-group-name $physical_id \
                        --region $REGION || true
                    ;;
                "AWS::EC2::SecurityGroup")
                    aws ec2 delete-security-group \
                        --group-id $physical_id \
                        --region $REGION || true
                    ;;
                "AWS::EC2::VPC")
                    aws ec2 delete-vpc \
                        --vpc-id $physical_id \
                        --region $REGION || true
                    ;;
            esac
        fi
    done <<< "$RESOURCES"
fi

# Force delete the stack
echo -e "${YELLOW}Force deleting CloudFormation stack...${NC}"
aws cloudformation delete-stack \
    --stack-name $STACK_NAME \
    --region $REGION || true

echo -e "${YELLOW}Waiting for stack deletion to complete...${NC}"
aws cloudformation wait stack-delete-complete \
    --stack-name $STACK_NAME \
    --region $REGION || true

echo -e "${GREEN}Force cleanup completed!${NC}" 