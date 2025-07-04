# Reach17 – RESTful API

Reach17 is a backend API for managing university courses aligned with the UN 2030 Sustainable Development Goals.

---

## Author

Developed by the Reach17 Dev Team  
For educational and demonstration purposes only.

---

## Tools & Stack

- Node.js + Express – RESTful API
- MySQL – Relational database
- Docker – Local MySQL container
- Postman – API testing

---

## Setup Instructions

1. Clone the repository
   git clone https://github.com/brandijsen/reach17.git
   cd reach17

2. Install dependencies
   npm install

3. Create a .env file in the project root:
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=reach17
   DB_NAME=reach17
   PORT=3000

4. Start MySQL using Docker
   docker run --name mysql-reach17 -e MYSQL_ROOT_PASSWORD=reach17 -p 3306:3306 -d mysql:8.0

5. Create the database
   Open migrations.sql and run it via MySQL Workbench or the MySQL CLI to set up the schema.

6. Start the server
   npm run dev

---

## Project Structure

reach17/
├── controllers/          # Business logic
├── models/               # Database queries
├── routes/               # API endpoints
├── db.js                 # DB connection setup
├── migrations.sql        # SQL schema
├── .env                  # Environment variables
├── index.js              # Main app entry point
└── README.md             # Project documentation
