const express = require("express");
const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const apiRouter = require("./routes/api")

const env = require("dotenv").config();

const databaseUri = process.env.DATABASE_URI;

const { connect } = require("./config/moongose");
const config = require("./config/moongose");
var db = require("./config/database");

connect(databaseUri);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/signin", signinRouter);
app.use("/api/signup", signupRouter);
app.use("/api",apiRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
