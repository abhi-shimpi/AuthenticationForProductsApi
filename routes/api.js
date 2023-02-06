const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
var db = require('../config/database')
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();


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
  

router.get('/',authenticateUser,(req,res)=>{
    console.log(db.collection('newProduct').find({}));
    res.send("Welcome TO Products API");
})

router.get('/products',authenticateUser,(req,res)=>{
    db.collection('newProduct').find({}).toArray((err,result)=>{  // to convert it into array
        if(err) throw err
        console.log(result)
        res.send(result);
    })
})

router.get('/products/:_id',authenticateUser,(req,res)=>{
    let query = {_id :ObjectId(req.params._id)}
    db.collection('newProduct').find(query).toArray((err,result)=>{
        if(err)throw err
        res.send(result)
    })
})

router.delete('/products/deleteProduct/:_id',authenticateUser,(req,res)=>{
    let query = {_id :ObjectId(req.params._id)}
    let present = db.collection('newProduct').find(query)
    console.log(present)
    if(present){
        db.collection('newProduct').deleteOne(query,(err,result)=>{
        if(err)throw err
        res.send("Deleted Successfully")
    })}
    else{
        res.send("Product Not Present")
    }
})
router.put('/products/:_id',authenticateUser,(req,res)=>{
    let query = {_id :ObjectId(req.params._id)}
    console.log(query)
    let product = {
        product : req.body.product,
        price : req.body.price,
        prodId:req.body.prodId
    }
    let dataset = {
        $set : product 
    }

    db.collection('newProduct').updateOne(query,dataset, (err,result)=>{
        if(err)throw err
        res.send(product)
    })
})

router.post('/products/addProduct',authenticateUser,(req,res)=>{
    let temp = db.collection('newProduct').find({})
    let resp = db.collection('newProduct').find({}).limit(1)
    resp.forEach(obj =>{
        let product ={
            product : req.body.product,
            price : req.body.price,
            prodId:req.body.prodId
        }
        db.collection('newProduct').insertOne(product,(err,result)=>{
            if(err) res.status(500).send(err)
            res.send("Added successfully")
        })
    })
})

module.exports = router;