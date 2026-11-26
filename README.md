# Order Management System (OMS)

A simple Order Management System built to manage the complete business workflow from customer registration and estimation to proposal approval, order processing, project execution, invoicing, and closure.

This project is being developed step by step using React, TypeScript, Python (FastAPI), MySQL and Docker.

## Project Overview

The Order Management System is designed to streamline the sales and project workflow by connecting customers, estimations, proposals, orders, projects and invoicing in one system.

## Business Workflow

The planned business workflow is:

1. Customer Registration
2. Estimation Creation and Approval
3. Proposal Creation and Submission
4. Proposal Negotiation and Revision
5. Client Acceptance
6. Draft Order Creation
7. Draft Order Review and Revision
8. Final Review and Clearance
9. Formal Order Receipt
10. Order Acceptance
11. Job Allocation
12. Project Creation
13. Project Execution
14. Milestone Invoicing
15. Job Closure

## Modules

- **Customers** – Create and manage customer records.
- **Estimation** – Create estimations linked to customers and manage approval status.
- **Proposals** – Create proposals from approved estimations, manage proposal status and maintain revisions.
- **Draft Orders** – Planned module for draft order preparation and review.
- **Orders** – Manage formal order receipt and acceptance.
- **Projects & Work Orders** – Manage project creation and job allocation.
- **Execution & Invoicing** – Track project progress and milestone invoicing.
- **Closure** – Manage project and job closure.

## Current Progress

### Completed (Frontend)

- Customer creation and editing
- Estimation creation linked to customers
- Estimation approval workflow
- Proposal creation from approved estimations
- Proposal status workflow
- Proposal revision creation and editing
- Previous proposal revisions retained
- React navigation between modules

### Planned

- Draft Order workflow
- Order management enhancements
- Project and work order management
- Execution and milestone invoicing
- Job closure
- User authentication and role-based access
- Backend API development
- MySQL database integration
- Docker-based deployment
- Testing

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| TypeScript | Frontend programming language |
| Vite | Frontend development server |
| Python | Backend programming language |
| FastAPI | Backend API framework |
| MySQL | Database |
| Docker | Containerization |

## Project Structure

```text
Order-Management-System/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.tsx
│       ├── Customers.tsx
│       ├── Estimation.tsx
│       ├── Proposal.tsx
│       ├── Dashboard.tsx
│       ├── Navbar.tsx
│       ├── CreateOrder.tsx
│       ├── OrderList.tsx
│       ├── EditOrder.tsx
│       ├── types.ts
│       ├── App.css
│       ├── index.css
│       └── main.tsx
│
├── backend/
│
├── database/
│
├── .gitignore
└── README.md
```

## Running the Frontend

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Subashri1262/Order-Management-System.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd Order-Management-System/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```text
   http://localhost:5173
   ```

## Development Status

This project is currently under development. Frontend modules are being implemented and tested incrementally before backend, database and deployment integration.

## Author

Developed as a learning and development project for building a simple, practical Order Management System.
