# AWS Deployment Rules

## Services Overview

### Compute
- **EC2** - Virtual servers
- **ECS/Fargate** - Container orchestration
- **Lambda** - Serverless functions
- **Elastic Beanstalk** - PaaS (easy deployment)

### Database
- **RDS** - Managed relational databases (PostgreSQL, MySQL)
- **DynamoDB** - NoSQL database
- **ElastiCache** - Redis/Memcached

### Storage
- **S3** - Object storage
- **EFS** - File system
- **EBS** - Block storage for EC2

### Networking
- **VPC** - Virtual private cloud
- **Route 53** - DNS
- **CloudFront** - CDN
- **ELB** - Load balancer

### Others
- **IAM** - Identity & access management
- **CloudWatch** - Monitoring & logs
- **SES** - Email service
- **SNS/SQS** - Messaging

## Deployment Options

### 1. Elastic Beanstalk (Easiest)

**Best for**: Quick deployment without infrastructure management

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create production

# Deploy
eb deploy

# View logs
eb logs

# SSH into instance
eb ssh
```

#### Configuration

```yaml
# .ebextensions/01-node.config
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
    NodeVersion: 18.x
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    DATABASE_URL: your-db-url
```

---

### 2. ECS + Fargate (Containerized)

**Best for**: Docker containers, microservices

#### Step 1: Create ECR Repository

```bash
# Create repository
aws ecr create-repository --repository-name my-app

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Build and push
docker build -t my-app .
docker tag my-app:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```

#### Step 2: Create ECS Task Definition

```json
{
  "family": "my-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "my-app",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/my-app:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:db-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Step 3: Create ECS Service

```bash
aws ecs create-service \
  --cluster my-cluster \
  --service-name my-app-service \
  --task-definition my-app:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

---

### 3. Lambda + API Gateway (Serverless)

**Best for**: APIs, event-driven, low traffic

#### Next.js on Lambda

```bash
# Install Serverless Framework
npm install -g serverless

# Deploy
npx serverless deploy
```

#### serverless.yml

```yaml
service: my-nextjs-app

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    NODE_ENV: production
    DATABASE_URL: ${env:DATABASE_URL}

functions:
  nextjs:
    handler: .next/serverless/pages/index.handler
    events:
      - httpApi: '*'

plugins:
  - serverless-nextjs-plugin
```

#### Or use AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

---

### 4. EC2 (Manual Control)

**Best for**: Full control, custom configurations

#### Step 1: Launch EC2 Instance

```bash
# Create instance
aws ec2 run-instances \
  --image-id ami-xxx \
  --instance-type t3.small \
  --key-name my-key \
  --security-group-ids sg-xxx \
  --subnet-id subnet-xxx
```

#### Step 2: Setup Application

```bash
# SSH into instance
ssh -i my-key.pem ubuntu@ec2-xxx.compute.amazonaws.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone and setup app
git clone https://github.com/your-repo/app.git
cd app
npm install
npm run build

# Start with PM2
pm2 start npm --name "my-app" -- start
pm2 startup
pm2 save

# Install Nginx
sudo apt install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Database Setup

### RDS (PostgreSQL)

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier my-postgres \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password yourpassword \
  --allocated-storage 20

# Get endpoint
aws rds describe-db-instances \
  --db-instance-identifier my-postgres \
  --query 'DBInstances[0].Endpoint.Address'
```

### DynamoDB

```ts
// lib/dynamodb.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

export async function putItem(tableName: string, item: any) {
  await docClient.send(new PutCommand({
    TableName: tableName,
    Item: item,
  }));
}

export async function getItem(tableName: string, key: any) {
  const result = await docClient.send(new GetCommand({
    TableName: tableName,
    Key: key,
  }));
  return result.Item;
}
```

---

## S3 for Static Assets

### Upload Files

```ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({ region: 'us-east-1' });

export async function uploadFile(file: Buffer, key: string) {
  await s3.send(new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: key,
    Body: file,
    ContentType: 'image/jpeg',
  }));

  return `https://my-bucket.s3.amazonaws.com/${key}`;
}
```

### CloudFront CDN

```bash
# Create CloudFront distribution for S3
aws cloudfront create-distribution \
  --origin-domain-name my-bucket.s3.amazonaws.com \
  --default-root-object index.html
```

---

## Environment Variables

### AWS Secrets Manager

```bash
# Store secret
aws secretsmanager create-secret \
  --name prod/database/url \
  --secret-string "postgresql://user:pass@host:5432/db"

# Retrieve in app
```

```ts
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' });

export async function getSecret(secretName: string) {
  const response = await client.send(new GetSecretValueCommand({
    SecretId: secretName,
  }));
  return response.SecretString;
}
```

---

## CI/CD with GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build and Push Docker Image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: my-app
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster my-cluster \
            --service my-app-service \
            --force-new-deployment
```

---

## Monitoring

### CloudWatch Logs

```ts
import { CloudWatchLogsClient, PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';

const client = new CloudWatchLogsClient({ region: 'us-east-1' });

export async function logEvent(message: string) {
  await client.send(new PutLogEventsCommand({
    logGroupName: '/aws/app/my-app',
    logStreamName: 'production',
    logEvents: [
      {
        message,
        timestamp: Date.now(),
      },
    ],
  }));
}
```

### Alarms

```bash
# Create alarm for high CPU
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu \
  --alarm-description "Alert when CPU exceeds 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold
```

---

## Security Best Practices

1. **Use IAM roles** - Never hardcode credentials
2. **Enable VPC** - Isolate resources
3. **Use Security Groups** - Restrict access
4. **Enable encryption** - RDS, S3, EBS
5. **Use Secrets Manager** - For sensitive data
6. **Enable CloudTrail** - Audit logs
7. **Regular updates** - Keep instances patched
8. **Least privilege** - Minimal IAM permissions

---

## Cost Optimization

1. **Right-size instances** - Don't over-provision
2. **Use Reserved Instances** - For predictable workloads
3. **Auto Scaling** - Scale down when idle
4. **S3 Lifecycle Policies** - Move old data to cheaper storage
5. **CloudWatch monitoring** - Track spending
6. **Delete unused resources** - EBS volumes, snapshots

```bash
# Set up cost alerts
aws budgets create-budget \
  --account-id 123456789 \
  --budget file://budget.json
```
