# 🔧 AWS Permissions Issue - How to Fix

## Current Problem
Your IAM user `BedrockAPIKey-qzre` doesn't have sufficient permissions to run Amplify sandbox.

## Error
```
User: arn:aws:iam::471112782782:user/BedrockAPIKey-qzre is not authorized to perform: ssm:GetParameter
```

## ✅ Solution: Add Required IAM Permissions

### For Development (Easiest):

1. **Go to AWS IAM Console:**
   - Navigate to: https://console.aws.amazon.com/iam/
   
2. **Find your IAM user** (`BedrockAPIKey-qzre`)

3. **Attach the following managed policy:**
   - `AdministratorAccess` (for development/testing only)
   
   **OR** for more security, attach these policies:
   - `AWSCloudFormationFullAccess`
   - `IAMFullAccess`
   - `AmazonS3FullAccess`
   - `CloudWatchLogsFullAccess`
   - Plus custom policy below

### Custom Policy for Amplify (More Secure):

Create a custom policy with this JSON:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameter",
        "ssm:PutParameter",
        "ssm:DeleteParameter",
        "cloudformation:*",
        "s3:*",
        "iam:*",
        "cognito-idp:*",
        "cognito-identity:*",
        "appsync:*",
        "lambda:*",
        "logs:*",
        "dynamodb:*",
        "bedrock:*"
      ],
      "Resource": "*"
    }
  ]
}
```

## Alternative: Use AWS SSO or Different Credentials

If you have another AWS account/user with admin access:

```bash
# Configure a new profile with admin credentials
npx ampx configure profile

# When prompted, use credentials with AdministratorAccess
```

## Next Steps After Fixing Permissions

Once permissions are fixed, run:

```bash
# Start the Amplify sandbox
npx ampx sandbox

# In another terminal, start the dev server
npm run dev
```

The sandbox will:
1. Deploy your backend to AWS
2. Create authentication resources  
3. Set up AppSync GraphQL API
4. Configure the Bedrock data source
5. Generate `amplify_outputs.json` with real endpoints

## Verify It's Working

Once the sandbox deploys successfully, you should see:
```
✓ Sandbox environment deployed
✓ Watching for file changes...
```

Then your app at `http://localhost:3000` will work with:
- ✅ `client.queries.generateHaiku()` function available
- ✅ Authentication working
- ✅ Bedrock AI integration active

---

## Need Help?

If you continue to have issues:
1. Check your AWS credentials: `aws sts get-caller-identity`
2. Verify your region supports Bedrock: `us-east-1` or `us-west-2`
3. Ensure Bedrock model access is enabled in AWS Console
