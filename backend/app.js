const express = require("express");
const cors = require("cors")
const errorHandle = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(errorHandle);
module.exports = app;
