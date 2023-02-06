const express = require("express");
const signinController = require("../controller/signin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/user");


require("dotenv").config();

function authenticateUser(req, res, next){
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).send({ error: 'No authorization header provided' });
    }
  
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(req.user);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
}
  
const router = express.Router();
router.post("/",authenticateUser,signinController.signin);

module.exports = router;
