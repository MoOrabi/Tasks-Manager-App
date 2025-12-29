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

Python 3.11+

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
Create .env file and add your config values there

▶️ 3.5 Run backend (Locally)
python app.py


Backend runs at:

http://localhost/5000

🌐 4. Frontend Setup (Locally)
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

 6. Docker Setup & Run

Prerequisites

Install Docker and Docker Compose

Environment variables
Make sure your .env file exists in the backend folder — it will be loaded automatically by Docker.

Build & Run using Docker Compose

From the project root:

docker-compose up --build


This will:

Build the Flask backend image

Build the React frontend image

Start a MySQL database container

Services & Ports

Backend API → http://localhost:5000

Frontend → http://localhost:3000

MySQL → port 3306 (internal only unless mapped)

Stopping containers

docker-compose down


To remove volumes (wipe DB):

docker-compose down -v

🔐 7. API Endpoints
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
🧪 8. Example Payloads
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

📌 9. Assumptions Made

No refresh tokens — access token expires based on default config.

API is intentionally simple and not versioned (/api/v1 skipped).

Basic UI — no advanced design or CSS framework.

10. Examples from UI

![register](https://github.com/user-attachments/assets/f8975486-ee9c-4a68-94df-331318105168)

