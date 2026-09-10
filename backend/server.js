const express = require("express");
const cors = require("cors");
const http = require("http");
const startOrderCleanup = require("./cron/OrderCleanup");
require("dotenv").config();
const connectDB = require("./config/DB");
const {
  initSocket,
} = require("./socket");
startOrderCleanup();
const categoryRoutes = require("./routes/CategoryRoutes");
const foodRoutes = require("./routes/FoodRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const superAdminRoutes = require("./routes/SuperAdminRoutes");
const app = express();
const authRoutes = require("./routes/AuthRoutes");
app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
  })
);
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send(
    "Restaurant QR Backend is running!"
  );
});
app.use(
  "/api/auth",
   authRoutes);
app.use(
  "/api/foods",
  foodRoutes
);
app.use(
  "/api/categories",
  categoryRoutes
);
app.use(
  "/api/orders",
  orderRoutes
);
app.use(
  "/api/superadmin",
  superAdminRoutes
);
const PORT =
  process.env.PORT || 5000;
const server = http.createServer(app);
initSocket(server);
server.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
    console.log(
      "Socket.IO initialized successfully"
    );
  }
);