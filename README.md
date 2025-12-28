Task Manager — Flask + React + JWT + MySQL

A simple full-stack task management app with authentication.

Users can:

Register / Login (JWT-based)

Create tasks

View their own tasks

Update task status

Delete tasks

Frontend: React
Backend: Flask
Database: MySQL

📦 1. Project Structure
project/
 ├── backend/
 └── frontend/
 └── README.md

⚙️ 2. Prerequisites

Make sure you have installed:

Python 3.13+

Node.js + npm

MySQL running locally

Postman (optional for testing backend)

🛠️ 3. Backend Setup (Flask)
📌 3.1 Create and activate virtual environment
cd backend
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate         # Windows

📥 3.2 Install dependencies
pip install -r requirements.txt

🗄️ 3.3 MySQL Database

Create database:

CREATE DATABASE tasks_db;

⚙️ 3.4 Configure database (config.py)

In backend/config.py, edit:

SQLALCHEMY_DATABASE_URI = "mysql://username:password@localhost:3306/tasks_db"


(or PyMySQL):

mysql+pymysql://username:password@localhost:3306/tasks_db

▶️ 3.5 Run backend
python app.py


Backend runs at:

http://localhost/5000

🌐 4. Frontend Setup (React)
📥 4.1 Install dependencies
cd frontend
npm install

▶️ 4.2 Run React dev server
npm run dev


Frontend runs at:

http://localhost:5173

🔗 5. Connecting Frontend & Backend

The frontend expects your backend at:

http://localhost:5000


If backend URL changes, update:

frontend/src/api/client.js

🔐 6. API Endpoints
Auth
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login + get JWT
Tasks (JWT required)

Add header:

Authorization: Bearer <token>

Method	Endpoint	Description
GET	/tasks/	List user’s tasks
POST	/tasks/	Create task
PUT	/tasks/:id	Update task
DELETE	/tasks/:id	Delete task
🧪 7. Example Payloads
Register
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

Login Response
{
  "access_token": "jwt_token_here"
}

Create Task
{
  "title": "Buy groceries",
  "description": "Milk, Bread",
  "status": "pending"
}

📌 8. Assumptions Made

Users should only access their own tasks (enforced in backend).

Passwords are hashed, never stored in plain text.

JWT stored in localStorage (simple approach for learning).

This app is designed for learning / demo purposes, not production.

No refresh tokens — access token expires based on default config.

API is intentionally simple and not versioned (/api/v1 skipped).

Basic UI — no advanced design or CSS framework.