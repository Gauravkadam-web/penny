# Penny — Core Expense Tracker (Version 1)

Penny is a modern personal finance management web application. Version 1 focuses on single-user expense tracking with dynamic, database-backed category management.

## 🚀 Technology Stack

- **Backend:** Java 21, Spring Boot 3.x, Spring Data JPA, PostgreSQL, Lombok, Maven
- **Frontend:** React 18, Vite, Axios, Custom CSS (Variables + Flex/Grid)
- **Database:** PostgreSQL 16
- **DevOps:** Docker, Docker Compose, GitHub Actions (CI/CD)

## 📁 Repository Structure

- `backend/` — Spring Boot REST API
- `frontend/` — React SPA with Vite
- `database/` — Migration & seed SQL scripts
- `DOCS/` — Software Requirements Specification (SRS) & Product Roadmap
- `postman/` — Postman API test collection

## 🛠️ Quick Start

### Prerequisites
- Docker & Docker Compose
- Java 21 & Maven 3.8+ (for local backend development)
- Node.js 18+ (for local frontend development)

### Running with Docker Compose
```bash
cp .env.example .env
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

## 📚 Documentation
For complete requirements and roadmap, see [DOCS/SRS.md](DOCS/SRS.md) and [DOCS/PRODUCT_ROADMAP (2).md](DOCS/PRODUCT_ROADMAP%20(2).md).
