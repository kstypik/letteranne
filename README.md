# letteranne

[![100 - commitow](https://img.shields.io/badge/100-commitow-8CD08A?style=for-the-badge)](https://100commitow.pl)

leteranne is a social media app that lets people send intentionally delayed messages ("letters"). Invite friends or make new ones and immerse yourself in deep conversations.

## Technologies

Below you can find links to the documentation of major projects used in this application.

- [Python 3.12](https://docs.python.org/3.12/)
- [Django 5.0](https://docs.djangoproject.com/en/5.0/)
- [Django REST Framework 3.15](https://www.django-rest-framework.org/)
- [PostgreSQL 16.2](https://www.postgresql.org/docs/16/index.html)
- [Node.js 21.7](https://nodejs.org/docs/latest-v21.x/api/index.html)
- [Typescript 5.1](https://www.typescriptlang.org/docs/)
- [React 18.2](https://react.dev/learn)
- [Mantine 7.6](https://mantine.dev/getting-started/)
- [Docker](https://docs.docker.com/)
- [DevContainers](https://containers.dev/)
- [MkDocs](https://www.mkdocs.org/user-guide/)

## Development

### Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [just](https://github.com/casey/just) to run project tasks (optional, but recommended; if you don't install it you have to copy-paste commands from justfile to follow the rest of this section)
- Install [uv](https://github.com/astral-sh/uv) to manage Python's virtual environments and packages
- Install [pnpm](https://pnpm.io/installation) to manage frontend packages
- Install [mise](https://mise.jdx.dev/) to manage versions of Node.js and Python (optional)
- Install [EditorConfig](https://editorconfig.org/) to keep coding style consistent (optional)

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

#### Backend

With `just` installed, you can run the command below to set the local environment variables, install Python & Node on your machine through mise and build Docker images:

```bash
just setup
```

After the setup, you can start the containers by simply typing:

```bash
just up -d
```

**Note:** -d flag is for using the detached mode in Docker, so your terminal won't be connected to the container

If everything went smoothly, your local application should be up and running under localhost:8000

#### Frontend

Move to directory:

```bash
cd client
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

Your local frontend application should be running under localhost:5173

## Production Deployment

TBD

## Name origin

The name came to my mind while reading L. M. Montgomery's book *Anne of Windy Poplars* which largely consists of letters Anne wrote to her fiancé Gilbert.
