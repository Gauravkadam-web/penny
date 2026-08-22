# Software Requirements Specification (SRS)

## Penny — Version 1 (Core Expense Tracker)

**Document Type:** Software Requirements Specification
**Product:** Penny
**Version Covered:** V1 (Core Expense Tracker)
**Status:** Draft — Updated for Dynamic Category Management
**Document Version:** 1.1

---

## 1. Introduction

### 1.1 Purpose

This document specifies the functional and non-functional requirements for **Penny V1 — Core Expense Tracker**. It supersedes the earlier V1 scope where expense categories were hardcoded (static enum values). In this revision, **categories are treated as a first-class, dynamic, user-manageable resource** with full CRUD support, instead of a fixed list.

This SRS is intended for backend engineers, frontend engineers, QA, and any AI coding agent (see Section 9) working on the Penny V1 codebase.

### 1.2 Scope

Penny V1 is a single-user, production-deployed expense tracking web application. It allows a user to:

- Manage (create, read, update, delete) personal expenses
- Manage (create, read, update, delete) their own expense **categories** dynamically
- Filter and view expenses by category and date
- View a basic summary of total spend and expense count

V1 explicitly **excludes**: authentication/multi-user support, income tracking, accounts/payment methods, budgets, analytics/charts, recurring transactions, notifications, and AI features. These are scoped to later versions (V2–V14) per the Penny Product Roadmap.

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|---|---|
| CRUD | Create, Read, Update, Delete |
| DTO | Data Transfer Object |
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| FK | Foreign Key |
| RBAC | Role-Based Access Control (out of scope for V1) |
| Soft Delete | Marking a record inactive instead of physically deleting it |

### 1.4 References

- Penny Product Roadmap (V1–V14), Section 5: "Version 1 — Core Expense Tracker"
- Penny V1 — Backend Structure diagram (Java Spring Boot)
- Penny V1 — Frontend Structure diagram (React/Vite)
- Penny V1 — Top Level Project Structure diagram
- `Agents.md` — Repository and AI-agent contribution rules (embedded in full in Section 9)

### 1.5 Overview

Section 2 describes the product at a high level. Section 3 details functional requirements, including the updated dynamic category system. Section 4 covers data/entity design. Section 5 covers interfaces (UI, API, DB). Section 6 covers non-functional requirements. Section 7 maps requirements to the existing architecture. Section 8 defines V1 acceptance criteria. Section 9 embeds the Agents.md development constraints in full.

---

## 2. Overall Description

### 2.1 Product Perspective

Penny V1 is a new, standalone product — the first release in a longer, versioned roadmap. It is a three-tier web application:

- **Frontend:** React (Vite) single-page application
- **Backend:** Java Spring Boot REST API
- **Database:** PostgreSQL

### 2.2 Product Functions (V1 Summary)

1. Expense CRUD
2. **Category CRUD (dynamic — new in this revision)**
3. Expense filtering by category and date
4. Basic expense summary (total amount, count)
5. Responsive dashboard UI

### 2.3 User Classes and Characteristics

| User Class | Description |
|---|---|
| End User (single user, no auth in V1) | Uses the app to log and review personal expenses and manage their own categories |
| Developer / AI Agent | Builds and maintains the codebase under the constraints in Section 9 |

> Note: Because V1 has no authentication, categories and expenses are effectively global/single-tenant. The data model should still be designed so that adding a `user_id` foreign key in V5 (Authentication & Multi-User) does not require restructuring the `category` or `expense` tables — only adding a column and a migration.

### 2.4 Operating Environment

- Backend: Java 21, Spring Boot 3.x, Spring Web MVC, Spring Data JPA, Maven, Lombok, Docker
- Frontend: React 18, Vite, Axios, React Router DOM, Context API, custom hooks, CSS (custom + variables)
- Database: PostgreSQL
- Deployment: Dockerized services, CI pipeline (per `.github/workflows/ci.yml`)

### 2.5 Design and Implementation Constraints

- Must follow the already-approved backend and frontend folder structures (see Section 7).
- All API request/response payloads must use DTOs — no entity leakage to the frontend.
- All exceptions must go through a global exception handler with standard HTTP status codes.
- Category values must **not** be hardcoded as a Java `enum` or as a frontend constant array — they must be stored in the database and served via API (this is the core change in this revision).
- All rules in `Agents.md` (Section 9) are binding constraints on implementation, not suggestions.

### 2.6 Assumptions and Dependencies

- Single-user context assumed for V1 (no login).
- PostgreSQL instance is available and reachable via environment variables.
- Frontend and backend are developed and deployed independently but versioned together per release.
- The seven categories currently listed in the roadmap (Food, Transport, Shopping, Bills, Health, Entertainment, Other) become the **initial seed data** for the new `category` table, not a fixed enum.

---

## 3. Functional Requirements

### 3.1 Expense Management (CRUD)

#### FR-1: Create Expense
The system shall allow a user to create an expense with:
- Title (required, max 150 chars)
- Amount (required, positive decimal)
- Category (required — must reference an existing, active category by ID)
- Expense date (required, cannot be in the future)
- Description (optional, max 500 chars)

On success, the system shall persist the expense with auto-generated `id`, `createdAt`, and `updatedAt` timestamps and return `201 Created` with the created expense DTO.

#### FR-2: View All Expenses
The system shall allow retrieval of all expenses, each including the resolved category name (not just a category ID), via `GET /api/expenses`.

#### FR-3: View Expense by ID
The system shall allow retrieval of a single expense by ID via `GET /api/expenses/{id}`. Returns `404 Not Found` if the expense does not exist.

#### FR-4: Update Expense
The system shall allow updating any editable field of an existing expense via `PUT /api/expenses/{id}`. If the category is being changed, the new category ID must exist and be active. Returns `200 OK` with the updated expense, `404 Not Found` if the expense doesn't exist, and `400 Bad Request` if the category is invalid.

#### FR-5: Delete Expense
The system shall allow permanent deletion of an expense via `DELETE /api/expenses/{id}`. Returns `204 No Content` on success, `404 Not Found` if the expense doesn't exist.

#### FR-6: Filter Expenses
The system shall support filtering the expense list by:
- Category (`GET /api/expenses?categoryId=`)
- Date or date range (`GET /api/expenses?date=` or `?startDate=&endDate=`)

#### FR-7: Expense Summary
The system shall provide a summary endpoint (`GET /api/expenses/summary`) returning:
- Total expense amount
- Total number of expenses

---

### 3.2 Category Management — Dynamic (NEW)

This is the key change from the original V1 scope. Categories move from a hardcoded, fixed set of values to a **user-manageable, database-backed resource** with full CRUD, matching the same engineering standard used for expenses (DTOs, validation, exception handling).

#### FR-8: Create Category
The system shall allow creating a new category via `POST /api/categories` with:
- Name (required, unique, max 50 chars)
- Description (optional, max 200 chars)
- Active status (defaults to `true`)

Returns `201 Created`. Returns `409 Conflict` if a category with the same name already exists (case-insensitive).

#### FR-9: View All Categories
The system shall allow retrieval of all categories via `GET /api/categories`, with an optional `?activeOnly=true` query parameter to return only active categories (used to populate the expense-creation dropdown).

#### FR-10: View Category by ID
The system shall allow retrieval of a single category via `GET /api/categories/{id}`. Returns `404 Not Found` if it doesn't exist.

#### FR-11: Update Category
The system shall allow renaming or updating the description/active status of a category via `PUT /api/categories/{id}`. Returns `409 Conflict` if renaming would duplicate an existing category name.

#### FR-12: Delete Category
The system shall support deleting a category via `DELETE /api/categories/{id}`, subject to the following business rule:

- **If the category is referenced by one or more existing expenses**, the system shall **not hard-delete** it. Instead, the system shall either:
  - (a) reject the delete with `409 Conflict` and a message indicating the category is in use, **or**
  - (b) perform a **soft delete** (set `isActive = false`) so historical expenses remain valid, while the category no longer appears as a selectable option for new expenses.
  - The product decision for V1 is **(b) soft delete**, to avoid breaking existing expense records — this must be reflected in the implementation and API documentation.
- If the category is not referenced by any expense, the system may hard-delete it.

#### FR-13: Seed Default Categories
On first application startup (or via a database migration/seed script), the system shall pre-populate the `category` table with the following active categories, matching the original roadmap scope: **Food, Transport, Shopping, Bills, Health, Entertainment, Other.** These are seed data, not code-level constants — the user may edit or deactivate them like any other category (except see FR-14).

#### FR-14: Category Deletion Safeguard for "Other"
The system shall prevent the "Other" category from being hard-deleted (soft-delete/deactivate is allowed if desired), to preserve a fallback category for edge cases. This is a business rule, not a hardcoded category list — enforced by a flag (e.g., `isSystemDefault`) on the category record, not by name-matching in code.

#### FR-15: Category Validation on Expense Creation/Update
When creating or updating an expense, the backend shall validate that the supplied category ID exists and is **active**. Attempting to assign an inactive or non-existent category returns `400 Bad Request`.

---

### 3.3 Frontend Requirements (V1)

#### FR-16: Dashboard
Display total expenses, expense count, and a recent expenses list, fetched dynamically from the backend.

#### FR-17: Expense List Page
Display all expenses in a table/list with category name, amount, date, and actions (edit/delete). Support filtering by category (populated dynamically from `GET /api/categories?activeOnly=true`) and by date.

#### FR-18: Add/Edit Expense Form
The category field must be rendered as a **dynamic dropdown/select populated from the Category API** — not a hardcoded list of options in the component or a constants file.

#### FR-19: Category Management Page (NEW)
A new page/section allowing the user to:
- View all categories (active and inactive)
- Add a new category
- Edit a category's name/description
- Deactivate (soft-delete) or delete a category
This maps to a new `pages/Categories.jsx` and `services/categoryService.js` in the existing frontend structure.

#### FR-20: Responsive Layout
All new and existing V1 screens must be responsive, following the existing layout/component conventions (no inline styles — see Agents.md rule 8).

---

## 4. Data Requirements

### 4.1 Category Entity (New Table)

| Field | Type | Constraints |
|---|---|---|
| id | BIGINT / UUID | Primary Key, auto-generated |
| name | VARCHAR(50) | Required, unique (case-insensitive) |
| description | VARCHAR(200) | Optional |
| isActive | BOOLEAN | Default `true` |
| isSystemDefault | BOOLEAN | Default `false`; `true` for "Other" |
| createdAt | TIMESTAMP | Auto-set on creation |
| updatedAt | TIMESTAMP | Auto-updated on modification |

### 4.2 Expense Entity (Updated)

| Field | Type | Constraints |
|---|---|---|
| id | BIGINT / UUID | Primary Key, auto-generated |
| title | VARCHAR(150) | Required |
| amount | DECIMAL | Required, > 0 |
| categoryId | BIGINT / UUID | **Foreign Key → category.id** (replaces the old enum `category` column) |
| expenseDate | DATE | Required, not in the future |
| description | VARCHAR(500) | Optional |
| createdAt | TIMESTAMP | Auto-set on creation |
| updatedAt | TIMESTAMP | Auto-updated on modification |

### 4.3 Migration Note

If a prior implementation already stored `category` as an enum column directly on `expense`, a database migration is required to:
1. Create the `category` table and seed it (FR-13).
2. Add a `category_id` foreign key column to `expense`.
3. Backfill `category_id` on existing rows by matching the old enum value to the new `category.name`.
4. Drop the old enum column once backfill is verified.

This migration belongs in `database/migrations/` per the existing top-level project structure.

---

## 5. External Interface Requirements

### 5.1 API Endpoints Summary

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/expenses` | Create expense |
| GET | `/api/expenses` | List expenses (supports `categoryId`, `date`/`startDate`/`endDate` filters) |
| GET | `/api/expenses/{id}` | Get expense by ID |
| PUT | `/api/expenses/{id}` | Update expense |
| DELETE | `/api/expenses/{id}` | Delete expense |
| GET | `/api/expenses/summary` | Total amount & count |
| POST | `/api/categories` | Create category |
| GET | `/api/categories` | List categories (supports `?activeOnly=true`) |
| GET | `/api/categories/{id}` | Get category by ID |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete/deactivate category |

### 5.2 Backend Component Additions

Per the existing backend structure, add:
- `entity/Category.java`
- `dto/CategoryRequest.java`, `dto/CategoryResponse.java`
- `repository/CategoryRepository.java`
- `service/CategoryService.java`, `service/CategoryServiceImpl.java`
- `controller/CategoryController.java`
- `mapper/CategoryMapper.java`
- Update `entity/Expense.java` to hold a `Category` relationship instead of an enum field
- New exception types as needed, e.g. `CategoryInUseException`, `DuplicateCategoryException`

### 5.3 Frontend Component Additions

Per the existing frontend structure, add:
- `pages/Categories.jsx`
- `services/categoryService.js` (`getAllCategories()`, `createCategory()`, `updateCategory()`, `deleteCategory()`)
- `components/category/` (e.g. `CategoryForm.jsx`, `CategoryTable.jsx`) following the same pattern as `components/expense/`
- Update `ExpenseForm.jsx` to fetch categories via `categoryService.getAllCategories({ activeOnly: true })` instead of any static list

### 5.4 Software Interfaces

- PostgreSQL via Spring Data JPA
- REST/JSON over HTTP between frontend and backend
- Environment-based configuration (`application.properties`, `.env` / `.env.example`) — secrets never committed, per Agents.md rule 5

---

## 6. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Category and expense list endpoints should respond within acceptable latency for a single-user dataset (no pagination required until V2, per roadmap). |
| Security | No secrets in code or version control; all config via environment variables (Agents.md rules 3–5). |
| Usability | Category selection must never show inactive/deleted categories for new expenses, to avoid user confusion. |
| Maintainability | Category logic must follow the same layered pattern (controller → service → repository) already used for expenses — no shortcuts. |
| Reliability | Deleting a category in use must never orphan or corrupt existing expense records (see FR-12). |
| Testability | Both Expense and Category modules require automated tests at controller, service, and repository layers, per the existing `test/` structure. |
| Portability | Application must run via Docker as already defined in `backend/Dockerfile` and `frontend/Dockerfile`. |

---

## 7. Architecture Mapping (Traceability)

This SRS builds directly on the already-approved structures:

- **Top-Level Structure:** `penny/{docs, backend, frontend, database, postman, .github, README.md}`
- **Backend Structure:** layered Spring Boot app under `com.penny.backend` (`config, controller, dto, entity, repository, service, mapper, exception, enums, util`)
- **Frontend Structure:** React/Vite app under `src/{components, pages, layouts, services, hooks, context, utils, constants, styles}`

The Category feature described in this SRS is implemented **entirely within these existing folders** — no new top-level directories or architectural patterns are introduced, per Agents.md rule 1 ("Do not change approved architecture").

---

## 8. Acceptance Criteria for V1 Release (Updated)

V1 is considered complete only when, in addition to the original roadmap criteria:

- [ ] Categories are fully database-backed with no hardcoded enum/array remaining in backend or frontend code
- [ ] Category CRUD APIs are implemented, tested, and documented (Postman collection updated)
- [ ] Expense creation/edit forms populate categories dynamically from the API
- [ ] Deleting a category in use does not break existing expenses (soft delete verified)
- [ ] Default categories are seeded via migration/seed script, not hardcoded in application code
- [ ] All original V1 expense CRUD, filtering, and summary features still function correctly
- [ ] Automated tests exist for both Expense and Category modules (controller/service/repository layers)
- [ ] Documentation (`docs/`, this SRS, API docs, Postman collection) is updated to reflect dynamic categories
- [ ] CI pipeline passes; deployment succeeds; production smoke test confirms category CRUD and expense CRUD both work end-to-end

---

## 9. Development Constraints — Agents.md (Embedded in Full)

The following rules govern any human or AI agent contributing to the Penny codebase, including implementation of the requirements in this SRS. These are binding constraints, not suggestions.

1. Do not change approved architecture.
2. Follow repository structure.
3. Never request or expose secrets.
4. Use environment variables.
5. Never commit `.env`.
6. Follow API specification.
7. Follow UI design system.
8. Do not use inline styles.
9. Do not hardcode business data.
10. Write tests for new functionality.
11. Do not modify unrelated files.
12. Do not push directly to main.
13. Run required checks before completion.
14. Update documentation when architecture changes.
15. Ask for approval when requirements are ambiguous.

**Direct implications for this SRS:**
- Rule 1 & 2 → the Category feature must slot into the existing backend/frontend folder structures (Section 7), not introduce new architecture.
- Rule 9 → this SRS's entire purpose is to eliminate the hardcoded category list (rule 9 directly motivates FR-8–FR-15).
- Rule 6 & 7 → new Category endpoints and UI must follow the same API and design conventions already established for Expenses.
- Rule 10 → Category CRUD requires the same test coverage as Expense CRUD (Section 8).
- Rule 15 → the soft-delete-vs-reject decision in FR-12 was made explicitly in this document; any further ambiguity during implementation should be raised before proceeding.

---

## 10. Out of Scope for V1

- Authentication, multi-user support, and per-user category ownership (V5)
- Category icons/colors, budgets per category, or analytics (V3+)
- Bulk category import/export
- Category ordering/custom sort

---

*End of SRS — Penny V1 (Dynamic Categories Revision)*
