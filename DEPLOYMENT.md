# Deployment Guide

## VPS Deployment (Docker Compose)

### Prerequisites

- Linux VPS with Docker and Docker Compose plugin
- SSH access to server
- Domain name (optional, recommended when enabling TLS proxy)

### Step 1: Prepare server

```bash
ssh user@your-server
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
```

Log out and back in to apply docker group permissions.

### Step 2: Clone and configure

```bash
git clone <repo-url>
cd letteranne
cp .env.example .env.production
```

Edit `.env.production` and set production-safe values:

```bash
DJANGO_DEBUG=0
DJANGO_SECRET_KEY=<generate-strong-secret>
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://letteranne:STRONG_PASSWORD@db:5432/letteranne_prod
POSTGRES_USER=letteranne
POSTGRES_PASSWORD=STRONG_PASSWORD
POSTGRES_DB=letteranne_prod
```

Generate a secret value:

```bash
openssl rand -base64 48
```

### Step 3: Deploy

```bash
set -a
source .env.production
set +a

docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec app python manage.py migrate
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f app
```

### Step 4: Optional reverse proxy/TLS

The stack can be fronted by Caddy or Traefik. For either approach:

- remove direct host port binding from `app`
- route external `:80/:443` traffic through the proxy container
- configure `ALLOWED_HOSTS` to match the domain

### Maintenance

```bash
# View logs
docker compose -f docker-compose.prod.yml logs -f app

# Restart
docker compose -f docker-compose.prod.yml restart

# Update deployment
git pull
docker compose -f docker-compose.prod.yml up -d --build

# Database backup
docker compose -f docker-compose.prod.yml exec db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup.sql
```

### Monitoring

```bash
curl http://localhost:8000/healthz
```

Baseline recommendations:

- uptime checks (UptimeRobot / Healthchecks)
- centralized logs (Loki / Papertrail)
- metrics (Prometheus + Grafana)
