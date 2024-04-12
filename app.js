const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user")

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

mongoose.connect(process.env.ATLAS_URI);
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected With Mongo :)"));

// Using routes
app.use('/', userRoutes) 

app.listen(8005, () => {
  console.log('Server started on port 8000');
});