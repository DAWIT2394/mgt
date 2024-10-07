require("express-async-errors");
const cors = require("cors");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db/connect.js");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// File paths
const views = path.join(__dirname, 'view');

// Serve static HTML page
app.get('/', (req, res) => {
  res.sendFile(`${views}/index.html`);
});

// Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static("views"));
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management (Admin, Team Leader)
app.use('/api/reports', reportRoutes); // Report submission & retrieval

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

// Start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
