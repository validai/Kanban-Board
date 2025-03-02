# Kanban Board Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This is a **Kanban Board Application** that allows users to create, update, and manage tasks using a drag-and-drop interface. The backend is built with **Node.js, Express, and Sequelize**, while the frontend uses **React with TypeScript**.

## Features
- **User Authentication**: JWT-based authentication.
- **CRUD Operations**: Users can create, update, and delete tasks.
- **Drag-and-Drop**: Tasks can be moved between columns.
- **Persistent Storage**: Data is stored in a PostgreSQL database.
- **Error Handling**: Proper error messages for API failures.
- **Token-Based Authorization**: Protects API routes.
- **Deployment Ready**: Hosted on Render.

## Installation
1. **Clone the repository**
   git clone https://github.com/yourusername/kanban-board.git
   cd kanban-board

2. **Install dependencies**
   npm install

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_url

4. **Run database migrations**
   npx sequelize-cli db:migrate


5. **Start the development server**
   npm run dev

## Usage
- **Frontend**: Visit `http://localhost:5173`
- **Backend**: Runs on `http://localhost:5000`
- **Login**: Users must authenticate to access protected routes.

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and get a JWT token.

### Users
- `GET /api/users` - Fetch all users.
- `GET /api/users/:id` - Fetch a specific user.
- `PUT /api/users/:id` - Update user details.
- `DELETE /api/users/:id` - Delete a user.

### Tickets
- `GET /api/tickets` - Fetch all tickets.
- `POST /api/tickets` - Create a new ticket.
- `PUT /api/tickets/:id` - Update ticket details.
- `DELETE /api/tickets/:id` - Delete a ticket.

## Authentication
- Uses **JWT (JSON Web Token)** for secure authentication.
- Tokens are stored in **localStorage**.
- API requests include a **Bearer token** in the Authorization header.

## Technologies Used
- **Frontend**: React, TypeScript, React Beautiful DnD
- **Backend**: Node.js, Express, Sequelize, PostgreSQL
- **Authentication**: JWT, bcrypt
- **Deployment**: Render, Vercel

## Deployment
This application is not deployed!!


## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork.
5. Create a pull request.

## License
This project is licensed under the **MIT License**.

