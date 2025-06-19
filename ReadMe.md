# 🧪 Indian Oil - Daily Chemical Consumption Portal

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Express](https://img.shields.io/badge/Backend-Express.js-lightgrey?logo=express)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![XAMPP](https://img.shields.io/badge/Server-XAMPP-orange?logo=apache)


A full-stack portal designed for Indian Oil employees to **log**, **track**, and **review** their daily chemical consumption securely and efficiently.

---

## 📂 Project Structure

```bash
.
├── backend/
│ ├── index.js
│ ├── package.json
│ └── package-lock.json
│
├── Database/
│ ├── Database.sql
│ ├── Form.sql
│ └── users.sql
│
├── frontend/
│ ├── index.html
│ ├── tailwind.config.js
│ ├── vite.config.ts
│ ├── tsconfig.json
│ ├── postcss.config.js
│ ├── package.json
│ ├── src/
│ │ ├── App.tsx
│ │ ├── index.css
│ │ ├── main.tsx
│ │ ├── vite-env.d.ts
│ │ ├── components/
│ │ │ ├── DetailsCard.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Header.tsx
│ │ │ ├── Sidebar.tsx
│ │ │ └── UserWelcome.tsx
│ │ ├── pages/
│ │ │ ├── ChemicalForm.tsx
│ │ │ ├── loginPage.tsx
│ │ │ ├── ReportPage.tsx
│ │ │ └── SignupPage.tsx
│ │ └── utils/
│ │ │ ├── App.tsx
│ │ │ ├── index.css
│ │ │ ├── main.tsx
│ │ │ └── vite-env.d.ts

```
---

## 🚀 Features

- ✅ User authentication (login & signup)
- ✅ Secure password hashing (bcrypt)
- ✅ Chemical entry form with multiple fields
- ✅ Report page to view/filter entries
- ✅ Relational database design
- ✅ Modern UI with Tailwind and Framer Motion

---

## 🛠️ Tech Stack

| Layer     | Technology                                |
|-----------|--------------------------------------------|
| Frontend  | React, Tailwind CSS, Framer Motion, Vite   |
| Backend   | Node.js, Express.js                        |
| Database  | MySQL (via XAMPP)                          |
| Tools     | TypeScript, Lucide Icons, ESLint           |

---

## 🗄️ Database Schema

### `users` Table

| Field       | Type         | Description                  |
|-------------|--------------|------------------------------|
| id          | INT (PK)     | Unique user ID               |
| email       | VARCHAR(255) | Unique user email            |
| password    | VARCHAR(255) | Hashed password              |
| name        | VARCHAR(255) | Full name                    |
| created_at  | TIMESTAMP    | Timestamp (auto)             |

---

### `chemical_form` Table

| Field        | Type           | Description                      |
|--------------|----------------|----------------------------------|
| id           | INT (PK)       | Entry ID                         |
| user_id      | INT (FK)       | References `users.id`            |
| date         | DATE           | Date of entry                    |
| unit         | VARCHAR(100)   | Unit or department               |
| chemical     | VARCHAR(255)   | Name of chemical                 |
| uom          | VARCHAR(50)    | Unit of Measurement              |
| sapcode      | VARCHAR(100)   | SAP material code                |
| opening      | DECIMAL(10,2)  | Opening stock                    |
| receive      | DECIMAL(10,2)  | Quantity received                |
| consumption  | DECIMAL(10,2)  | Quantity consumed                |
| closing      | DECIMAL(10,2)  | Closing stock                    |
| sapbalance   | DECIMAL(10,2)  | SAP recorded balance             |
| remarks      | TEXT           | Optional remarks                 |
| created_at   | TIMESTAMP      | Timestamp (auto)                 |

> 🔗 `user_id` is a foreign key with `ON DELETE CASCADE` from `users.id`

---

## 🧪 Setup Instructions

### 📦 MySQL Setup (via XAMPP)
1. Start Apache and MySQL via XAMPP.
2. Import the 3 files from `/Database`:  
   `Database.sql`, `users.sql`, `Form.sql` using phpMyAdmin or CLI.


### ⚙ Backend Setup

```bash
cd backend
npm install
# Create a .env file with your MySQL DB credentials
node index.js
```
### 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

🤝 Contributing
Contributions are welcome! Give Star ⭐ and Feel free to fork and raise a pull request.

📜 License
Licensed under the MIT License

Built with ❤️ by Subham Biswal