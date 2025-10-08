# Full-Stack Kanban Task Board

## Overview

This project is a **Kanban Task Management Board** built with a **React frontend** and a **Node.js + Express backend**, using **MongoDB** as the database.  
Users can create, update, and manage tasks across different columns — _To Do_, _In Progress_, and _Done_ — with intuitive drag-and-drop functionality.

---

## Backend

### Overview

The backend is built using **Express.js** and connected to **MongoDB** for data persistence.

Since I had no prior experience with backend development, I created the backend **with the help of ChatGPT**, and also took some help from my **teacher** to correctly connect **MongoDB**, where I was initially facing some connection errors.

### Key Features

- User authentication and authorization using **JWT tokens**
- Password hashing using **bcrypt**
- **Tasks CRUD API** — Create, Read, Update, Delete
- Middleware for authentication and token validation
- Tokens are stored securely in **HTTP-only cookies**
- Body parsing using `body-parser`
- Cookie parsing using `cookie-parser`
- User object is stored in `req.user` for authenticated routes

---

## Frontend

### State Management

The frontend is built with **React (v19)** and uses the **Context API** for global authentication state management.  
`AuthContext` stores and manages user details throughout the app.

### Authentication

- Tokens are stored in **cookies** instead of `localStorage`
- This approach was chosen because:
  - Cookies are **HTTP-only**, meaning they **cannot be accessed or modified by JavaScript**
  - This provides **better security** and helps prevent **XSS attacks**
  - `localStorage` can be modified easily through the browser console

### Drag and Drop

- For drag-and-drop functionality, I used **[@dnd-kit](https://github.com/clauderic/dnd-kit)** instead of `react-beautiful-dnd`
- `react-beautiful-dnd` was **deprecated** and **not compatible with React 19**
- `@dnd-kit` is modern, flexible, and works perfectly with the latest React version

### UI and Styling

- Styled using **Tailwind CSS**
- Dark theme with shades of **gray (800–950)** and **cyan (600)** for primary accents
- Clean and responsive UI

### Core Functionalities

- Create, edit, delete, and drag tasks between columns
- Role-based access (only creator or admin can modify a task)
- Real-time state updates after task changes
- Tasks are grouped by status (`To Do`, `In Progress`, `Done`)
- Reusable components (`TaskCard`, `Column`, `TaskModal`, etc.)

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- cookie-parser, body-parser

### Frontend

- React 19
- Context API
- Tailwind CSS
- @dnd-kit/core & @dnd-kit/sortable
- Axios

---

## Features Summary

| Feature         | Description                                  |
| --------------- | -------------------------------------------- |
| Authentication  | Secure login/signup with JWT & cookies       |
| Context API     | Global state management for user session     |
| Task Management | CRUD operations for tasks                    |
| Status Columns  | Tasks organized as To Do, In Progress, Done  |
| Drag & Drop     | Move tasks between columns                   |
| Security        | Cookies instead of localStorage for tokens   |
| UI              | Tailwind CSS dark theme with cyan highlights |

---

## Credits

- **Backend assistance**: ChatGPT
- **MongoDB setup help**: My teacher
- **Frontend development**: Self-built using React 19 and Tailwind CSS

---

## Installation & Setup

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
npm install
npm start
```

### Backend **.env**

```bash
PORT=8000
# MONGO_URI=mongodb://localhost:27017/nyi-kanban
MONGO_URI=mongodb+srv://jyotijaiswal4101_db_user:1jPtVbnxVmsCFdrF@cluster0.qdahrui.mongodb.net/nyi-kanban
JWT_SECRET=0cbc6611f5540bd0809a388dc95a615b
```

### Username and Passwords

- admin - (username: admin, password: Admin@123)
- user - (username: user-01, password: User-01@123)
