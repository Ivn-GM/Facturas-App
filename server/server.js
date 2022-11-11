const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Main route
app.use("/api/app_facturas", require("./routes/routes"));

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});