# 🏠 Capstone Project



## 🚀 Tech Stack

### Backend 
Node.js, Express.js, MySQL, Sequelize ORM, REST APIs

### Frontend
React (Vite) ,Tailwind CSS , React Router


## 📁 Project Structure
```bash
Home-Service/
├── Backend/
│   ├── src/
│   │   ├── controllers/     # HTTP request handling
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Database access
│   │   ├── models/          # Sequelize models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helpers & constants
│   │   └── server.js
│   └── package.json
│
├── Frontend/
│       ├── src/
│       │   ├── pages/       # Route-level pages
│       │   ├── components/  # Reusable UI components
│       │   ├── routes/      # React Router config
│       │   └── api/         # API abstraction layer
│       └── package.json
│
└── README.md
```
## ▶️ How to Run the Project

### Prerequisites
- Node.js (v18+ recommended)
- MySQL (running locally)
- npm

### 1️⃣ Backend Setup
```
cd Backend
npm install
```
### Create a .env file inside Backend/:
```
PORT=<Your_Port_number> Eg: 3000 , 4000 etc.
```

### inside Backend -> src -> config -> config.json write the code given below
```
{
  "development": {
    "username": "root",
    "password": <Your_Password>,
    "database": <Database_name>,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Run database migrations & seeders:
```
npx sequelize db:migrate
npx sequelize db:seed:all
```

### Start backend server:
```
npm run dev
```

** Backend runs on: **
http://localhost:3000

## 2️⃣ Frontend Setup
```
cd Frontend/client
npm install
```
### Create .env inside Frontend
```
VITE_API_BASE_URL=http://localhost:3000/api
```
### Start Frontend
```
npm run dev
```
** Frontend runs on **
http://localhost:5173



