# 🍽️ Restaurant QR Ordering System

### A Smart QR-Based Restaurant Ordering & Management System

Built with the MERN Stack

---

## 📌 About the Project

The **Restaurant QR Ordering System** is a web-based restaurant ordering and management system built using the **MERN Stack**.

The system allows customers to access the restaurant menu through a QR-based interface, enter their table or delivery information, browse available food items, place orders, and track their order status.

It also provides restaurant staff with tools to manage food items, categories, customer orders, and order processing.

### 🎯 Main Goal

The main goal of this project is to make the restaurant ordering process **faster, more convenient, and organized** by reducing manual ordering and providing a digital ordering workflow.

---

## ✨ Key Features

### 👤 Customer Features

* 📱 Access the restaurant menu through a QR-based system
* 🪑 Enter table information for dine-in orders
* 🍽️ Browse food items by category
* 🛒 Add food items to the cart
* 📝 Add remarks to food items
* 📦 Place dine-in and parcel orders
* 💳 Select a payment method
* ✅ Confirm dine-in orders or request waiter confirmation
* 📋 View order details
* 📊 Track order status in real time

### 👨‍🍳 Waiter Features

* 📥 View incoming customer orders
* ⏳ Manage waiting orders
* 🔄 Manage active orders
* ✅ Confirm customer orders
* 📊 Update order status
* 🖨️ Print confirmed orders
* ⚡ Receive real-time order updates

### 👨‍💼 Admin Features

* 🔐 Admin authentication
* 🍔 Add, update and delete food items
* 🗂️ Add, update and delete food categories
* 📋 View and manage customer orders
* 🔄 Update order status
* 🖨️ Print confirmed orders

### 👑 Super Admin Features

* 👥 View admin and waiter accounts
* 🔄 Enable or disable staff accounts
* 🛡️ Manage staff-level access

### 🔐 Authentication & Security

* JWT-based authentication
* Password hashing using bcryptjs
* Role-based access control
* Protected API routes
* Separate permissions for Admin, Waiter and Super Admin

---

## 🛠️ Technology Stack

### 🎨 Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* Axios
* Socket.IO Client

### ⚙️ Backend

* Node.js
* Express.js
* REST APIs
* Socket.IO

### 🗄️ Database

* MongoDB
* Mongoose
* MongoDB Atlas

### 🔐 Authentication & Security

* JSON Web Token (JWT)
* bcryptjs
* Authentication Middleware
* Role-based Authorization Middleware

### 🧰 Development Tools

* Git
* GitHub
* Postman
* Visual Studio Code

---

## 📂 Project Structure

```text
ResturantQR Menu/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── cron/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
├── docs/
│
├── .gitignore
└── README.md
```

---

## 🔄 Order Workflow

The Restaurant QR Ordering System follows a digital ordering workflow.

```text
Customer
   │
   ▼
Scan QR Code
   │
   ▼
Enter Customer & Table Information
   │
   ▼
Browse Menu
   │
   ▼
Select Food Items
   │
   ▼
Add Items to Cart
   │
   ▼
Checkout
   │
   ├── Dine-In Order
   │      │
   │      ▼
   │   Customer Confirmation
   │      │
   │      ▼
   │   Order Processing
   │
   └── Parcel Order
          │
          ▼
       Waiter Confirmation
          │
          ▼
       Order Processing
          │
          ▼
       Order Completed
```

---

## 👥 User Roles

The system uses role-based access control.

| Role        | Main Responsibilities                      |
| ----------- | ------------------------------------------ |
| Customer    | Browse menu, place orders and track orders |
| Waiter      | Confirm and manage customer orders         |
| Admin       | Manage foods, categories and orders        |
| Super Admin | Manage admin and waiter accounts           |

---

## 🧾 Order Types

### 🍽️ Dine-In

Customers can:

* Enter their table number
* Browse the restaurant menu
* Add food items to the cart
* Add remarks to food items
* Choose a payment method
* Place an order
* Confirm the order themselves or request waiter confirmation
* Track the order status

### 📦 Parcel

Customers can:

* Enter their name
* Provide contact information
* Enter delivery address
* Browse available food items
* Add food items to the cart
* Add remarks to food items
* Choose a payment method
* Place a parcel order
* Wait for waiter confirmation
* Track the order status

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PURNIMASHAH12/ResturantQR.git
cd ResturantQR
```

### 2. Backend Setup

Open a terminal and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the React application:

```bash
npm start
```

The frontend will run on:

```text
http://localhost:3000
```

### 4. Environment Variables

Make sure the required environment variables are configured before running the application.

> **Note:** Never commit your `.env` file, database credentials, JWT secret, or other sensitive information to GitHub.

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint          | Access    | Description                   |
| ------ | ----------------- | --------- | ----------------------------- |
| POST   | `/api/auth/login` | Public    | Login user                    |
| GET    | `/api/auth/me`    | Protected | Get current logged-in account |

### Food Management

| Method | Endpoint         | Access | Description           |
| ------ | ---------------- | ------ | --------------------- |
| GET    | `/api/foods`     | Public | Get all food items    |
| GET    | `/api/foods/:id` | Public | Get a food item by ID |
| POST   | `/api/foods`     | Admin  | Create a food item    |
| PUT    | `/api/foods/:id` | Admin  | Update a food item    |
| DELETE | `/api/foods/:id` | Admin  | Delete a food item    |

### Category Management

| Method | Endpoint              | Access | Description        |
| ------ | --------------------- | ------ | ------------------ |
| GET    | `/api/categories`     | Public | Get all categories |
| POST   | `/api/categories`     | Admin  | Create a category  |
| PUT    | `/api/categories/:id` | Admin  | Update a category  |
| DELETE | `/api/categories/:id` | Admin  | Delete a category  |

### Order Management

| Method | Endpoint                           | Access         | Description                |
| ------ | ---------------------------------- | -------------- | -------------------------- |
| POST   | `/api/orders`                      | Public         | Create an order            |
| GET    | `/api/orders/:id/customer`         | Public         | Get customer order details |
| GET    | `/api/orders`                      | Admin / Waiter | Get orders                 |
| GET    | `/api/orders/:id`                  | Admin / Waiter | Get a specific order       |
| PUT    | `/api/orders/:id`                  | Admin / Waiter | Update an order            |
| PUT    | `/api/orders/:id/customer_confirm` | Public         | Customer confirmation      |
| PUT    | `/api/orders/:id/confirm`          | Admin / Waiter | Confirm an order           |
| POST   | `/api/orders/:id/print`            | Admin / Waiter | Print confirmed order      |
| PUT    | `/api/orders/:id/status`           | Admin / Waiter | Update order status        |

### Super Admin Management

| Method | Endpoint                           | Access      | Description                     |
| ------ | ---------------------------------- | ----------- | ------------------------------- |
| GET    | `/api/superadmin/staff`            | Super Admin | Get admin and waiter accounts   |
| PUT    | `/api/superadmin/staff/:id/status` | Super Admin | Enable or disable staff account |

---

## ⚡ Real-Time Order Communication

The application uses **Socket.IO** to provide real-time communication between customers, waiters, and the restaurant system.

### Real-Time Features

* New orders can be received without manually refreshing the page.
* Waiters can receive order updates in real time.
* Customers can receive order confirmation and status updates.
* Order tracking can respond to real-time status changes.

### Communication Flow

```text
Customer
   │
   │ Places Order
   ▼
Backend API
   │
   │ Saves Order
   ▼
MongoDB
   │
   │ Socket.IO Event
   ▼
Waiter Dashboard
   │
   │ Confirms / Updates Order
   ▼
Backend
   │
   │ Socket.IO Update
   ▼
Customer Order Tracking
```

---

## 🔐 Security & Authentication

The application uses several security mechanisms to protect users and application data.

* **JWT (JSON Web Token)** for authentication
* **bcryptjs** for password hashing
* **Role-based access control**
* Protected backend routes
* Admin-only operations
* Super Admin-only staff management
* Environment variables for sensitive configuration
* `.env` files excluded from version control

---

## 🧠 Key Concepts Implemented

This project demonstrates practical implementation of:

* MERN Stack architecture
* RESTful APIs
* CRUD operations
* JWT authentication
* Password hashing
* Role-based authorization
* MongoDB database management
* Mongoose models and schemas
* React Context API
* Socket.IO real-time communication
* Order status management
* Protected routes
* API integration using Axios
* Middleware-based authorization

---

## 🎯 Future Improvements

* 📱 OTP verification for parcel orders
* 💳 Online payment integration
* 🔔 Improved order notifications
* 📊 Advanced sales and order analytics
* 📋 Customer order history
* 👥 Enhanced admin and waiter management

---

## 👩‍💻 Developer

**Purnima Shah**

BSc CSIT Student

This project was developed as a final-year academic project to demonstrate the practical implementation of a full-stack restaurant ordering and management system.

---

## 📄 License

This project is developed for academic and educational purposes.
