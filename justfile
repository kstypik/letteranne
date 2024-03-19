set dotenv-load := false

@_default:
    just --list

# Format the justfile
@fmt:
    just --fmt --unstable

# Performs initial setup for Docker images and allows Arguments to be passed
bootstrap *ARGS:
    #!/usr/bin/env bash
    set -euo pipefail

    if [ ! -f ".env" ]; then
        echo ".env created"
        cp .env.dev.example .env
    fi

    docker compose {{ ARGS }} build --force-rm

# Builds the Docker Images with no optional arguments
@cibuild:
    just build

# Builds the Docker Images with optional arguments
@build *ARGS:
    docker compose {{ ARGS }} build

# Perform the initial setup for the Docker containers
@setup:
    just bootstrap

# --------------------------------------------------
# Docker recipes
# --------------------------------------------------

# Bring down your docker containers
@down *ARGS:
    docker compose down {{ ARGS }}

# Allows you to view the output from running containers
@logs *ARGS:
    docker compose logs {{ ARGS }}

# Restart all services
@restart *ARGS:
    docker compose restart {{ ARGS }}

# Start all services
@start *ARGS="--detach":
    docker compose up {{ ARGS }}

@status:
    docker compose ps

# Stop all services
@stop:
    docker compose down

# Tail service logs
@tail:
    just logs --follow

# Bring up your Docker Containers
@up *ARGS:
    docker compose up {{ ARGS }}

# Django recipes
# --------------------------------------------------

# Drop into the console on the docker image
@console:
    docker compose run --rm django /bin/bash

@manage *ARGS:
    docker compose run --rm django python manage.py {{ ARGS }}

@makemigrations *ARGS:
    just manage makemigrations {{ ARGS }}

@migrate *ARGS:
    just manage makemigrations {{ ARGS }}

@showmigrations *ARGS:
    just manage showmigrations {{ ARGS }}

# Run the shell management command
@shell *ARGS:
    just manage shell {{ ARGS }}

# Create a Superuser
@createsuperuser USERNAME EMAIL:
    just manage createsuperuser \
        --username={{ USERNAME }} \
        --email={{ EMAIL }}

@pipcompile:
    uv pip compile apiserver/requirements.in -o apiserver/requirements.txt

@pipsync:
    uv pip sync apiserver/requirements.txt

@pytest *ARGS:
    docker compose run --rm django pytest {{ ARGS }}

@mypy *ARGS:
    docker compose run --rm django mypy {{ ARGS }}
