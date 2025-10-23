# Todo App

A full-stack Todo application with a **React + Vite frontend**, **NestJS backend**, and **MySQL database** running in Docker. Features include JWT authentication, task CRUD operations, and user-specific task management.

---

[Demo Video](https://youtu.be/O5F-xCN1-To)

---

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Frontend](#starting-frontend)
  - [Backend](#starting-backend)
  - [Database](#starting-dev-database)
  - [Prisma Setup & Migrations](#prisma-setup--migrations)
- [Environment Variables](#environment-variables)

---

## Project Structure

```

root/
├─ backend/ # NestJS backend
├─ frontend/ # React + Vite frontend
├─ docker-compose.yml
├─ README.md

```

---

## Getting Started

### Starting Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

The frontend will start on [http://localhost:5173](http://localhost:5173) (Vite default).

---

### Starting Backend

```bash
cd backend
pnpm install
pnpm run start:dev
```

The backend will run on [http://localhost:3000](http://localhost:3000) by default.

---

### Starting Dev Database

Ensure Docker is running and then start MySQL:

```bash
docker compose up -d
```

- The database is configured via `docker-compose.yml` to run MySQL 8.0
- Default database: `tasks_db`
- Root password: `rootpassword` (for dev purposes)

---

### Prisma Setup & Migrations

If you’ve just cloned the repo, you need to set up the database and Prisma client:

1. **Set environment variables**

Create a `.env` file in `backend/`:

```env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/tasks_db"
JWT_SECRET="your_jwt_secret_here"
```

2. **Run initial migration**

```bash
pnpx prisma migrate dev --name init
```

- Creates tables in MySQL based on `prisma/schema.prisma`
- Generates migration files in `prisma/migrations/`
- Generates Prisma client automatically

3. **Verify**

```bash
pnpx prisma studio
```

- Opens a GUI at [http://localhost:5555](http://localhost:5555) to inspect and edit tables interactively

> Anytime you modify `schema.prisma`, rerun `pnpx prisma migrate dev` to update the database.

---

## Environment Variables

You should create a `.env` file in both `frontend/` and `backend/` as needed.

**Example backend `.env`:**

```env
DATABASE_URL="mysql://root:rootpassword@localhost:3306/tasks_db"
JWT_SECRET="your_jwt_secret_here"
```

**Example frontend `.env` (if needed for API URLs):**

```env
VITE_API_URL="http://localhost:3000"
```

# Decision Making

## Front End

- TypeScript: type safety.
- Mantine: pre-built accessible UI components tp build quickly.
- React Query: data fetching, caching, and easy cache invalidation.

## Back End

- NestJS: structured, scalable framework (similar to Laravel)
- Prisma: type-safe ORM and simplified database access.
- JWT Auth: stateless, per-user task security.
- DTOs: ensures request integrity.

## Docker / Infrastructure

- Docker Compose: Quick DB for dev environment.
- Portability: quickly set up dev environment on an computer with `docker-compose up`.
