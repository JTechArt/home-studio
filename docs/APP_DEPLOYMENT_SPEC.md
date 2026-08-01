# Application Deployment Specification for Traefik Gateway & Shared Infrastructure

This document provides complete guidelines and templates for configuring and deploying web applications to run under the centralized **Traefik Gateway** on **Contabo** or **Hetzner** VPS environments.

By adhering to this specification, your application will benefit from:
- Automatic traffic routing for main domains or **subdomains** (e.g. `app1.domain.com`, `app2.domain.com`, `app3.domain.com`).
- Free, automatic SSL certificate provisioning and renewal via Let's Encrypt.
- Private, secure access to shared databases (PostgreSQL, MongoDB, Redis) if needed.
- Support for frontend-only apps (no database) as well as full-stack apps (with database).

---

## 1. Network & Architecture Overview

Every application runs in its own folder under `/opt/docker/apps/<app-name>` with its own `docker-compose.yml`.

### Docker Networks Used:
1. **`web` Network (Required for ALL Web Apps)**: Connect your application's public web container (Nginx, React, Node, Spring Boot, etc.) to this external network. Traefik listens on `web` and routes subdomains to your app.
2. **`db-net` Network (Optional - ONLY for Apps using Databases)**: Connect your backend container to `db-net` if it needs to talk to shared PostgreSQL, MongoDB, or Redis. If your app does NOT use a database, do NOT connect it to `db-net`.

---

## 2. Docker Compose Configuration Examples

### Case A: Web Application WITHOUT Database (Frontend / Static / Standalone App)

```yaml
version: '3.8'

services:
  web-app:
    image: ghcr.io/your-github-org/app1:latest
    container_name: app1-web
    restart: always
    networks:
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=web"
      # Subdomain routing rule (e.g., app1.yourdomain.com)
      - "traefik.http.routers.app1.rule=Host(`app1.yourdomain.com`)"
      - "traefik.http.routers.app1.entrypoints=websecure"
      - "traefik.http.routers.app1.tls=true"
      - "traefik.http.routers.app1.tls.certresolver=letsencrypt"
      # Port inside this container that receives HTTP traffic (e.g. 80, 3000, 8080)
      - "traefik.http.services.app1.loadbalancer.server.port=80"

networks:
  web:
    external: true
```

---

### Case B: Web Application WITH Database (Full-Stack App using Shared PostgreSQL / Redis)

```yaml
version: '3.8'

services:
  web-frontend:
    image: ghcr.io/your-github-org/app2-frontend:latest
    container_name: app2-frontend
    restart: always
    networks:
      - default
      - web
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=web"
      # Subdomain routing rule (e.g., app2.yourdomain.com)
      - "traefik.http.routers.app2.rule=Host(`app2.yourdomain.com`)"
      - "traefik.http.routers.app2.entrypoints=websecure"
      - "traefik.http.routers.app2.tls=true"
      - "traefik.http.routers.app2.tls.certresolver=letsencrypt"
      - "traefik.http.services.app2.loadbalancer.server.port=80"

  web-backend:
    image: ghcr.io/your-github-org/app2-backend:latest
    container_name: app2-backend
    restart: always
    environment:
      # Connect to shared PostgreSQL and Redis via hostnames on db-net
      - SPRING_DATASOURCE_URL=jdbc:postgresql://shared-postgres:5432/${DB_NAME}
      - SPRING_DATASOURCE_USERNAME=${DB_USER}
      - SPRING_DATASOURCE_PASSWORD=${DB_PASS}
      - REDIS_HOST=shared-redis
      - REDIS_PORT=6379
      - REDIS_PASSWORD=${REDIS_PASS}
    networks:
      - default
      - db-net

networks:
  web:
    external: true
  db-net:
    external: true
```

---

## 3. Shared Database Hostnames & Ports (Inside `db-net`)

If your app uses a database, use these internal hostnames:
- **PostgreSQL**: `shared-postgres:5432`
- **MongoDB**: `shared-mongodb:27017`
- **Redis**: `shared-redis:6379`

> [!IMPORTANT]
> **Database Isolation:**
> Each application should use its own distinct database name (e.g. `app2_db`, `app3_db`). If the database does not exist yet on the shared PostgreSQL / Mongo instance, create it before launching your application backend.

---

## 4. GitHub Actions Deployment Workflow Template

To deploy your application automatically when pushing to GitHub or via manual dispatch:

### GitHub Environment & Secrets Setup:
In your application repository, go to **Settings > Environments** -> Create an environment named **`contabo`** (or `hetzner`). Add these secrets:
- `VPS_HOST`: Public IP of the VPS (Contabo or Hetzner).
- `VPS_USER`: `deployer`
- `VPS_SSH_KEY`: SSH private key for `deployer`.
- `GHCR_PAT`: GitHub Personal Access Token with `read:packages` scope (or use `secrets.GITHUB_TOKEN`).
- *(Optional)* Database passwords if application uses a shared DB.

### Application `.github/workflows/deploy.yml` Template:

```yaml
name: Deploy Application

on:
  push:
    branches:
      - main
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target Environment'
        required: true
        default: 'contabo'
        type: choice
        options:
          - contabo
          - hetzner

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push Web Image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment || 'contabo' }}
    steps:
      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER || 'deployer' }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            # 1. Create app directory
            APP_NAME=$(basename ${{ github.repository }})
            mkdir -p /opt/docker/apps/$APP_NAME
            cd /opt/docker/apps/$APP_NAME

            # 2. Login to GHCR to pull image
            echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

            # 3. Pull and restart container
            docker compose pull || true
            docker compose up -d --remove-orphans
            docker image prune -f
```
