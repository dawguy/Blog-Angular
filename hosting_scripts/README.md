# Hosting scripts

Single-droplet hosting for all hobby sites via Docker Compose + nginx reverse proxy.

## Architecture

```
                    Internet
                       │
                       ▼
               nginx (:80, :443)
               ┌───────────────┐
               │ wrightdavid.com       → frontend (Angular)
               │ wrightdavid.com/api/  → backend  (Node API)
               │ yoloresponsibly.com   → kelly-criterion
               │ translatemethod.com    → bidirectional-translations (Phoenix LiveView)
               └───────────────┘
                       │
           ┌───────────┼───────────┐
           ▼           ▼           ▼
        frontend    backend    kelly-criterion    bidirectional-translations
        (Angular)   (Node.js)  (static)          (Phoenix / Elixir)
```

All services communicate internally via Docker DNS. Only nginx is exposed to the internet.

## One-time setup on the droplet

```bash
# 1. Clone or copy this directory to the droplet
scp -r hosting_scripts/ your-droplet:~/blog-server

# 2. SSH in and create your secrets file
ssh your-droplet
cd ~/blog-server
cp .env.example .env

# 3. Edit .env with real values
nano .env
```

The `.env` file needs these values:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` | Neon dashboard → Connection string |
| `SECRET_KEY_BASE` | Run `mix phx.gen.secret` in the Phoenix project |
| `PHX_HOST` | The domain you're serving this app on |

## Deploying the Phoenix app

Every time you push code changes:

**Step 1 — On your laptop:** Build the Docker image and push to Docker Hub.

```bash
cd ~/code/bidirectional_translations
./deploy.sh 1.0.2    # use a new version number each time
```

**Step 2 — On your droplet:** Pull the image, restart, and run migrations.

```bash
ssh your-droplet
cd ~/blog-server
./deploy.sh
```

## Deploying the other sites

The existing sites (Angular frontend, Node backend, kelly-criterion) use pre-built Docker Hub images. To update them, push a new image tag and update `docker-compose.yml` to reference the new tag, then run `./deploy.sh` on the droplet.

## Files

| File | Purpose |
|---|---|
| `docker-compose.yml` | All services and nginx in one compose file |
| `nginx/nginx.conf` | Reverse proxy routing all domains |
| `.env.example` | Template for secrets — copy to `.env` on the droplet |
| `.env` | Actual secrets — **never commit this** |
| `deploy.sh` | Run on droplet to pull images, restart, and run migrations |

## Troubleshooting

**Containers won't start:**
```bash
docker compose logs bidirectional-translations
```

**Nginx can't reach a service:**
```bash
docker compose exec nginx ping bidirectional-translations
```

**Migrations failed — need to roll back:**
```bash
docker compose exec bidirectional-translations /app/bin/bidirectional_translations eval "BidirectionalTranslations.Release.rollback(BidirectionalTranslations.Repo, 20260506140002)"
```

**LiveView isn't working (spinner forever):**
Check that nginx has the WebSocket headers (`Upgrade`, `Connection`) in `nginx/nginx.conf` for your domain.
