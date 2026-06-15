# Azure Deployment Guide

This guide provides step-by-step instructions for deploying the Daniel Ortiz Portfolio to Microsoft Azure.

## Prerequisites

- Azure account with active subscription
- Azure CLI installed (`az`)
- Node.js 18+ installed
- Git installed

## Deployment Options

### Option 1: Azure App Service (Recommended for beginners)

This option deploys to Azure App Service using a Node.js runtime container.

#### Step 1: Create Resource Group

```bash
# Login to Azure
az login

# Create resource group
az group create --name portfolio-rg --location "East US"
```

#### Step 2: Create App Service Plan

```bash
# Create App Service Plan (Free tier for development)
az appservice plan create \
  --name portfolio-plan \
  --resource-group portfolio-rg \
  --sku F1 \
  --is-linux
```

#### Step 3: Create Web App

```bash
# Create Web App
az webapp create \
  --resource-group portfolio-rg \
  --plan portfolio-plan \
  --name ddov-portfolio \
  --runtime "NODE|18-lts"
```

#### Step 4: Configure Environment Variables

```bash
# Set environment variables if needed
az webapp config appsettings set \
  --resource-group portfolio-rg \
  --name ddov-portfolio \
  --settings NEXT_PUBLIC_GITHUB_USERNAME=DanielOrtiz08
```

#### Step 5: Deploy Code

```bash
# Initialize git if not already
git init
git add .
git commit -m "Initial commit"

# Configure deployment source to local git
az webapp deployment source config-local-git \
  --resource-group portfolio-rg \
  --name ddov-portfolio

# Get deployment URL and push
az webapp deployment list-publishing-credentials \
  --resource-group portfolio-rg \
  --name ddov-portfolio

# Add Azure remote and push
git remote add azure <deployment-url>
git push azure main
```

### Option 2: Azure Static Web Apps (Best for static exports)

For optimal performance, deploy as a static site using Azure Static Web Apps.

#### Step 1: Modify next.config.js

Update `next.config.js` to enable static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

#### Step 2: Build static site

```bash
npm run build
```

#### Step 3: Create Static Web App via Azure Portal

1. Go to Azure Portal (portal.azure.com)
2. Click "Create a resource" > "Static Web App"
3. Fill in details:
   - Resource group: portfolio-rg
   - Name: ddov-portfolio
   - Region: East US
   - Deployment source: GitHub
4. Select your repository and branch
5. Build details:
   - Build preset: Next.js
   - App location: /
   - Output location: out
6. Click "Review + Create"

### Option 3: Azure Container Apps (Most flexible)

Deploy as a Docker container for maximum control.

#### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Step 2: Update next.config.js for standalone output

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

module.exports = nextConfig;
```

#### Step 3: Build and push to Azure Container Registry

```bash
# Create Container Registry
az acr create \
  --resource-group portfolio-rg \
  --name ddovacr \
  --sku Basic

# Login to ACR
az acr login --name ddovacr

# Build image
az acr build \
  --registry ddovacr \
  --image portfolio:latest .

# Create Container App environment
az containerapp env create \
  --name portfolio-env \
  --resource-group portfolio-rg \
  --location eastus

# Create Container App
az containerapp create \
  --name portfolio \
  --resource-group portfolio-rg \
  --environment portfolio-env \
  --image ddovacr.azurecr.io/portfolio:latest \
  --target-port 3000 \
  --ingress external \
  --registry-login-server ddovacr.azurecr.io
```

## Custom Domain Setup

### Step 1: Add Custom Domain

```bash
# Add custom domain to your app
az webapp config hostname add \
  --resource-group portfolio-rg \
  --webapp-name ddov-portfolio \
  --hostname ddov.dev

# Or via Azure Portal > Custom Domains
```

### Step 2: Configure DNS

Add these DNS records to your domain registrar:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| CNAME | @    | ddov-portfolio.azurewebsites.net |
| CNAME | www  | ddov-portfolio.azurewebsites.net |

### Step 3: Enable HTTPS

```bash
# Enable managed SSL certificate
 az webapp config ssl bind \
  --resource-group portfolio-rg \
  --name ddov-portfolio \
  --certificate-thumbprint <thumbprint>
```

## Environment Variables

Set environment variables via Azure Portal or CLI:

```bash
az webapp config appsettings set \
  --resource-group portfolio-rg \
  --name ddov-portfolio \
  --settings \
    NEXT_PUBLIC_GITHUB_USERNAME=DanielOrtiz08 \
    NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/daniel-david-ortiz-villanueva-7a8053257

## Continuous Deployment

### GitHub Actions (Recommended)

1. Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ddov-portfolio
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

2. Add publish profile to GitHub secrets:
   - Go to Azure Portal > App Service > Get publish profile
   - Add to GitHub repo Settings > Secrets > AZURE_WEBAPP_PUBLISH_PROFILE

## Cost Estimation

| Service             | Tier   | Estimated Monthly Cost |
|---------------------|--------|------------------------|
| App Service Plan    | F1     | Free                   |
| App Service         | Basic  | Free with F1 plan      |
| Static Web Apps     | Free   | $0                     |
| Container Apps      | Consumption | ~$10-30/month      |

## Monitoring

### Enable Application Insights

```bash
az monitor app-insights component create \
  --app portfolio-insights \
  --location eastus \
  --resource-group portfolio-rg

# Link to web app
az webapp config appsettings set \
  --resource-group portfolio-rg \
  --name ddov-portfolio \
  --settings APPINSights_INSTRUMENTATIONKEY=<key>
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version matches (18.x)
2. **502 Error**: App may be starting up, wait a few minutes
3. **Static files not loading**: Check `public` folder configuration

### Useful Commands

```bash
# View logs
az webapp log tail --name ddov-portfolio --resource-group portfolio-rg

# SSH into app
az webapp ssh --name ddov-portfolio --resource-group portfolio-rg

# Restart app
az webapp restart --name ddov-portfolio --resource-group portfolio-rg
```

## Resources

- [Azure Web Apps Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
