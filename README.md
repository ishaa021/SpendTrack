# SpendTrack 📊

A modern full-stack expense tracking web application built using the MERN stack.  
Track your income, expenses, and manage your finances with a clean and interactive dashboard.

---

## 🌐 Live Demo

🔗https://spend-track-pi.vercel.app/
---

## 🚀 Features

- 🔐 User Authentication (Login & Register)
- ➕ Add Income & Expense Transactions
- 🗑️ Delete Transactions
- 📊 Dashboard with Income, Expense & Balance
- 🔍 Filter Transactions (Type, Category, Month, Year)
- 🎨 Modern UI with animations
- 📱 Responsive Design

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 📂 Project Structure
expenseRecorder/
├── backend/
├── frontend/
└── README.md

---

## ⚙️ Installation

### Clone the repository
git clone https://github.com/ishaa021/SpendTrack.git
cd SpendTrack

---

### Install dependencies

#### Backend
cd backend
npm install

#### Frontend
cd frontend
npm install

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000

---

## ▶️ Run the App

### Backend
npm run dev

### Frontend
npm run dev

---

## 🌐 API Endpoints

### Auth
- POST `/api/users/register`
- POST `/api/users/login`

### Transactions
- GET `/api/transactions`
- POST `/api/transactions/add`
- DELETE `/api/transactions/:id`

### Summary
- GET `/api/transactions/summary`

---