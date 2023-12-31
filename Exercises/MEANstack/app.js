const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to Database
mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
  console.log("Connected to databse" + config.database);
});

mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

const users = require("./routes/users");

const port = 3000;

// CORS middleware
app.use(cors());

// Set static folder

app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
