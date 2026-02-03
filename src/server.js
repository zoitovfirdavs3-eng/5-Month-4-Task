require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRouter = require("./router/main.routes");
const dbConnection = require("./lib/db.service");

dbConnection().catch(() => process.exit(1));

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api", mainRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));
