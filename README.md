# letteranne

[![100 - commitow](https://img.shields.io/badge/100-commitow-8CD08A?style=for-the-badge)](https://100commitow.pl)

leteranne is a social media app that lets people send intentionally delayed messages ("letters"). Invite friends or make new ones and immerse yourself in deep conversations.

## Technologies

Below you can find links to the documentation of major projects used in this application.

- [Python 3.12](https://docs.python.org/3.12/)
- [Django 5.0](https://docs.djangoproject.com/en/5.0/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL 16.2](https://www.postgresql.org/docs/16/index.html)
- [Node.js 21.7](https://nodejs.org/docs/latest-v21.x/api/index.html)
- [React 18](https://react.dev/)
- [Mantine](https://mantine.dev/getting-started/)
- [Docker](https://docs.docker.com/)
- [DevContainers](https://containers.dev/)
- [MkDocs](https://www.mkdocs.org/user-guide/)

## Development

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [uv](https://github.com/astral-sh/uv) to manage Python's virtual environments and packages

Optional dependencies:

- **Recommended**: Install [just](https://github.com/casey/just) to run project tasks (optional, but recommended; if you don't install it you have to copy-paste commands from justfile to follow the rest of this section)
- Install [mise](https://mise.jdx.dev/) to manage versions of Node.js and Python
- Install [EditorConfig](https://editorconfig.org/) to keep coding style consistent

### Setting up your local environment

Clone the repo with git:

```bash
# by using https...
git clone https://github.com/kstypik/letteranne.git
# ... OR by using SSH
git clone git@github.com:kstypik/letteranne.git
```

Move to directory:

```bash
cd letteranne
```

With `just` installed, you can run the command below to set the local environment variables, install Python & Node on your machine through mise and build Docker images:

```bash
just setup
```

It might be useful to create a Python virtual environment on your local machine with all the project's dependencies so they can be used by your IDE:

```bash
uv venv

# On macOS and Linux...
source .venv/bin/activate
# ... OR on Windows.
.venv\Scripts\activate

uv pip install --requirement letteranne/requirements.txt
```

After the setup, you can start the containers by simply typing:

```bash
just up --detached
```

If everything went smoothly, your local application should be up and running under localhost:8000

## Production Deployment

TBD

## Name origin

The name came to my mind while reading L. M. Montgomery's book *Anne of Windy Poplars* which largely consists of letters Anne wrote to her fiancé Gilbert.
