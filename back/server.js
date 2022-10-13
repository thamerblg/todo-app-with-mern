const express = require("express");
var cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");

const app = express();

//CONNECT TO THE DATABASE
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use("/task", require("./routes/tasktRouters"));

const PORT = process.env.PORT;

// RUN THE SERVER
app.listen(PORT, (error) =>
  error ? console.log(error) : console.log(`App listening on port ${PORT}!`)
);
