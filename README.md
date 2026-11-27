# Order Management System (OMS)

## About the Project

The Order Management System (OMS) is a web application designed to manage the complete customer order lifecycle, from estimation to project execution, invoicing and job closure.

The main goal is to make order tracking and project management simple and organized.

## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend (Planned)
- Python
- FastAPI
- MySQL
- JWT Authentication
- Role-Based Access Control (RBAC)

### Deployment (Planned)
- Docker
- Docker Compose

## Frontend Modules

1. **Dashboard** – Displays an overview of the system.
2. **Customers** – Manage customer information.
3. **Estimation** – Create customer estimates.
4. **Proposals** – Manage proposals and revisions.
5. **Orders** – Manage client orders.
6. **Projects & Work Orders** – Manage projects and internal work orders.
7. **Execution & Invoicing** – Update work progress and manage milestone invoices.
8. **Job Closure** – Close completed work orders and projects.

## Order Management Workflow

Customer → Estimation → Proposal → Client Acceptance → Order → Work Order → Project → Execution → Invoicing → Job Closure

## Current Project Status

- [x] Frontend development
- [x] All 8 frontend modules connected
- [x] Frontend production build successful
- [x] Frontend workflow testing completed
- [ ] Backend development
- [ ] MySQL database integration
- [ ] User authentication using JWT
- [ ] Role-Based Access Control (RBAC)
- [ ] Frontend and backend integration
- [ ] Testing
- [ ] Docker deployment

## How to Run the Frontend

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Frontend Folder

```bash
cd Order-Management-System/frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

### 5. Create Production Build

```bash
npm run build
```

## Future Enhancements

- Develop REST APIs using FastAPI.
- Store application data in MySQL.
- Implement JWT-based authentication.
- Implement role-based access control.
- Connect the frontend with the backend.
- Containerize the application using Docker Compose.

---

**Project Status:** Frontend Completed | Backend Upcoming