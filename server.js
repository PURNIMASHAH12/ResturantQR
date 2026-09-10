const express = require("express");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const connectDB = require("./config/DB");
const {
  initSocket,
} = require("./socket");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/FoodRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const app = express();

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