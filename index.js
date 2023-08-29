const express = require("express");

const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const posts = require("./routes/posts");
const users = require("./routes/users");

require("dotenv").config();

// Connect to Database
mongoose.connect(process.env.DATABASE);

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

const port = process.env.port || process.env.PORT;

// CORS middleware
app.use(cors());

// Bodyparser middleware
app.use(bodyParser.json());

// Express
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// Routes for the app
app.use("/posts", posts);
app.use("/users", users);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});