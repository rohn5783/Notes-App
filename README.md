📄 README.md
# 📝 Notes Web App

A full-stack Notes Web Application built using the MERN stack that allows users to create, update, delete, and manage their notes securely.

This project implements authentication, protected routes, and a clean UI for managing notes efficiently.

---

## 🚀 Features

- User Authentication (Register & Login)
- Protected Routes
- Create Notes
- Get All Notes
- Get Note by Slug
- Update Note by Slug
- Delete Note by Slug
- Custom 404 Not Found Page
- Secure Password Hashing
- JWT Authentication
- Redis Token Blacklisting (Logout)

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- SCSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Cache
- Redis

---

## 📂 Project Structure


Notes-App
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── config
│
├── frontend
│ ├── components
│ ├── pages
│ ├── routes
│ └── styles
│
└── README.md


---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/rohn5783/Notes-App.git

Go to project folder

cd Notes-App
Install Backend Dependencies
cd backend
npm install

Start backend server

npm run dev
Install Frontend Dependencies
cd frontend
npm install

Start frontend

npm run dev
🔐 Authentication Flow

User registers using email and password

Password is hashed using bcrypt

User logs in and receives a JWT token

Token is stored in cookies

Protected routes verify the token

Redis is used for token blacklisting during logout

📡 API Endpoints
Auth
POST /register
POST /login
POST /logout
Notes
POST /notes
GET /notes
GET /notes/:slug
PUT /notes/:slug
DELETE /notes/:slug
📌 Future Improvements

Notes Search

Pagination

Tags System

Notes Pinning

Better UI/UX

👨‍💻 Author

web3.rohit
GitHub: https://github.com/rohn5783

