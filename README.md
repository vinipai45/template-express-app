# 🚀 TEMPLATE-EXPRESS-APP

A scalable, production-ready Node.js backend built with:

- Express.js
- TypeScript
- PostgreSQL
- Docker
- Zod (schema validation)
- Swagger UI Express
- Prettier & Husky (code style)
- Custom code generator for entity scaffolding

---

## 🧱 Features

- Modular folder structure
- Full CRUD support via `gen-entity` script
- Type-safe models using `zod`
- PostgreSQL integration with Docker
- Environment variable support via `.env`
- Prettier + Husky + lint-staged for formatting
- Manual SQL migration runner
- Reusable base classes for controller, service, and repository
- API Documentation with Swagger UI

---

## 🔧 Prerequisites

Ensure the following are installed on your system:

- 🐳 [Docker](https://www.docker.com/products/docker-desktop/)
- 🟪 Node.js **v20.x** or higher

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd template-express-app
npm install
```

### 2. Setup Environment

Create a .env file:

```bash
DATABASE_URL = <url>
PORT = 8000
```

---

## 🐳 Docker Workflow

Start the dev environment:

```bash
npm run dev-up
```

Stop all containers:

```bash
npm run dev-down
```

---

## 🧬 Entity Generation

Create full-featured CRUD for any model:

1. Create a config file:

```json
// scripts/entity.config.json
{
  "entity": "user",
  "fields": {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```

2. Run:

```bash
npm run gen-entity
```

This generates:

- `model`
- `controller`
- `service`
- `repository`
- `query`
- `route`
- `swagger`
- `SQL migration`

---

## 🗃️ Migrations

Run generated SQL migrations manually:

```bash
npm run migrate
```

You'll be prompted before each SQL file is executed.

---

## 🧼 Formatting

Format all files:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## 🧪 Type Checking

```bash
npm run type-check
```

---

## ✅ Git Hooks

Pre-commit formatting is handled by:

- husky
- lint-staged
- prettier

No unformatted code gets committed.

---

## 📦 Build for Production

```bash
npm run build
```

## 📁 Folder Structure

```plaintext
scripts/             # Gen entity, migrations
src/
├── config/          # DB config, environment setup
├── controllers/     # Route handlers
├── models/          # Zod schemas and TypeScript types
├── queries/         # SQL query constants
├── repositories/    # DB logic per entity
├── routes/          # Express routers
└── docs/            # Swagger Route Documentation
├── services/        # Business logic layer
└── index.ts         # Entry point
```

---

## 🧑‍💻 Author

Built by [Vineeth V Pai](https://www.linkedin.com/in/vineeth-v-pai/)

[GitHub](https://github.com/vinipai45)
