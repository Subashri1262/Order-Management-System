# Order Management System (OMS)

A simple Order Management System built to manage the business workflow from customer registration and estimation to proposal approval, order processing, work order allocation and project creation.

This project is being developed step by step using React, TypeScript, Python (FastAPI), MySQL and Docker.

## Project Overview

The Order Management System (OMS) is designed to streamline business operations by connecting customers, estimations, proposals, orders, work orders and projects in one application.

The goal is to build a simple and practical system that manages the complete order lifecycle while maintaining relationships between different business modules.

## Business Workflow

The planned business workflow is:

1. Customer Registration
2. Estimation Creation and Approval
3. Proposal Creation and Submission
4. Proposal Review and Revision
5. Client Acceptance
6. Order Creation
7. Order Review and Approval
8. Formal Purchase Order Receipt
9. Order Acceptance
10. Work Order Creation
11. Project Creation
12. Project Execution
13. Milestone Invoicing
14. Job Closure

## Modules

- **Dashboard** – Displays key business information and summary counts.
- **Customers** – Create, view and edit customer records.
- **Estimation** – Create service-based estimations linked to existing customers and manage approval.
- **Proposals** – Create proposals from approved estimations, manage proposal status and maintain revision history.
- **Orders** – Create orders from accepted proposals and manage the order approval and acceptance workflow.
- **Work Orders** – Create work orders from accepted orders and prevent duplicate work orders for the same order.
- **Projects** – Create projects from eligible work orders and maintain their relationship with the originating work order.

## Current Progress

### Completed – Frontend

- Dashboard with summary cards.
- Customer creation and editing.
- Estimation creation linked to existing customers.
- Estimation approval workflow.
- Proposal creation from approved estimations.
- Proposal status workflow:
  - Draft
  - In Review
  - Approved
  - Sent to Client
  - Accepted
- Proposal revision creation and revision history.
- Order creation from accepted proposals.
- Order workflow:
  - Draft
  - In Review
  - Approved
  - Formal Order Received
  - Order Accepted
- Formal Purchase Order number and date recording.
- Order editing restrictions after acceptance.
- Work order creation from accepted orders.
- Duplicate work order prevention.
- Project creation from eligible work orders.
- Duplicate project prevention.
- Dependency handling when deleting an order, including linked work orders and projects.
- Navigation between application modules.

### Planned – Future Development

- Backend API development using FastAPI.
- MySQL database integration.
- Data persistence.
- User authentication and role-based access.
- Project execution and progress tracking.
- Milestone-based invoicing.
- Job and project closure.
- Testing and validation.
- Docker-based deployment.

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
|
|-- frontend/
|   |-- public/
|   |-- src/
|       |-- App.tsx
|       |-- Customers.tsx
|       |-- Estimation.tsx
|       |-- Proposal.tsx
|       |-- Dashboard.tsx
|       |-- Navbar.tsx
|       |-- CreateOrder.tsx
|       |-- OrderList.tsx
|       |-- EditOrder.tsx
|       |-- ProjectsWorkOrders.tsx
|       |-- types.ts
|       |-- App.css
|       |-- index.css
|       |-- main.tsx
|
|-- backend/
|
|-- database/
|
|-- .gitignore
|-- README.md
```

## Running the Frontend

### Prerequisites

- Node.js
- npm
- Git

### Installation Steps

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

The core frontend modules have been implemented, and the main business workflows have been tested.

The project is currently in the frontend review stage. Backend development, database integration and deployment will be taken up in subsequent phases.

Data is currently managed within the frontend application and is not yet persisted in a database.

## Author

Developed as a learning and development project to build a simple, practical Order Management System.