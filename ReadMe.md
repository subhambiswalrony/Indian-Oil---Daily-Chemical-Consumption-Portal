# 🧪 Indian Oil - Daily Chemical Consumption Portal

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-F80000?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-239120?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node JS](https://img.shields.io/badge/Node%20js-140648?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A full-stack portal designed for Indian Oil employees to **log**, **track**, and **review** their daily chemical consumption securely and efficiently.

---

## 📂 Project Structure

```bash
.
├── backend/
│ ├── index.js
│ ├── mailer.js
│ ├── supabase.js
│ ├── package.json
│ └── package-lock.json
│
├── Database/
│ ├── Form.sql
│ ├── users.sql
│ └── otp_tokens.sql
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
│ │ │ ├── ForgotPassword.tsx
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

- ✅ User authentication (login, signup, forgot password via OTP)
- ✅ OTP system with expiry logic
- ✅ Secure password hashing (bcrypt)
- ✅ Chemical form with validations
- ✅ Report filter and entry listing
- ✅ Fully responsive and animated UI

---

## 🛠️ Tech Stack

| Layer     | Technology                                |
|-----------|--------------------------------------------|
| Frontend  | React, Tailwind CSS, Framer Motion, Vite   |
| Backend   | Node.js, Express.js                        |
| Database  | Supabase, PostgreSQL                       |
| Tools     | TypeScript, Lucide Icons, ESLint           |

---

## 🗄️ Database Schema

### `users` Table

| Column Name      | Data Type      | Description                                                                     |
| ---------------- | -------------- | ------------------------------------------------------------------------------- |
| `id`             | `SERIAL`       | Auto-incrementing primary key for each user.                                    |
| `first_name`     | `VARCHAR(100)` | User's first name.                                                              |
| `last_name`      | `VARCHAR(100)` | User's last name.                                                               |
| `email`          | `VARCHAR(100)` | User's email address (must be unique).                                          |
| `phone`          | `VARCHAR(20)`  | User's phone number.                                                            |
| `password`       | `VARCHAR(255)` | Encrypted (hashed) user password.                                               |
| `created_at`     | `TIMESTAMP`    | Timestamp of when the user account was created. Defaults to current time.       |
| `plain_password` | `VARCHAR(100)` | ⚠️ Plain text password (for dev/demo only) — **not recommended in production.** |



---

### `chemical_form` Table

| Field          |   Type           | Description                      |
|----------------|------------------|----------------------------------|
| `id`           | `INT (PK)`       | Entry ID                         |
| `user_id`      | `INT (FK)`       | References `users.id`            |
| `date`         | `DATE`           | Date of entry                    |
| `unit`         | `VARCHAR(100)`   | Unit or department               |
| `chemical`     | `VARCHAR(255)`   | Name of chemical                 |
| `uom`          | `VARCHAR(50)`    | Unit of Measurement              |
| `sapcode`      | `VARCHAR(100)`   | SAP material code                |
| `opening`      | `DECIMAL(10,2)`  | Opening stock                    |
| `receive`      | `DECIMAL(10,2)`  | Quantity received                |
| `consumption`  | `DECIMAL(10,2)`  | Quantity consumed                |
| `closing`      | `DECIMAL(10,2)`  | Closing stock                    |
| `sapbalance`   | `DECIMAL(10,2)`  | SAP recorded balance             |
| `remarks`      | `TEXT`           | Optional remarks                 |
| `created_at`   | `TIMESTAMP`      | Timestamp (auto)                 |

> 🔗 `user_id` is a foreign key with `ON DELETE CASCADE` from `users.id`

---


### `otp_tokens` Table

|  Column Name  |    Type       | Description                  |
| ------------- | -----------   | ---------------------------- |
| `id`          | `UUID (PK)`   | Unique token ID              |
| `email`       | `TEXT (FK)`   | References `users.email`     |
| `otp`         | `TEXT`        | One-Time Password            |
| `token`       | `TEXT`        | Optional tracking token      |
| `expires_at`  | `TIMESTAMPTZ` | OTP expiry timestamp         |
| `created_at`  | `TIMESTAMPTZ` | Auto timestamp of generation |

> 🔗 `users_email` is a foreign key 


## 🧪 Setup Instructions

### 📦 Supabase Setup 
1. Goto to Official Website of Supabase and create your project.
2. In SQL editor, copy code from `Database` folder:  
   and paste it to create `users`, `chemical_form` and `otp_tokens` Tables by using PostgreSQL.


### ⚙ Backend Setup

```bash
cd backend
npm install
# Create a .env file with your FRONTEND_URL, Supabase DB & MAIL User and Mail Pass credentials
node index.js
```
### 💻 Frontend Setup
```bash
cd frontend
npm install
# Create a .env file with your BACKEND_URL credentials
npm run dev
```

🤝 Contributing
Contributions are welcome! Give Star ⭐ and Feel free to fork and raise a pull request.

📜 License
Licensed under the MIT License

Built with ❤️ by Subham Biswal