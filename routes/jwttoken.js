var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const fs = require("fs");

/* CREATE JWT token first time*/
router.post('/signdetails', function(req, res, next) {

  fs.readFile("./customer.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const customer = JSON.parse(jsonString);
    //check if client exists or not..
    var users = customer.users;
    if(users.includes(req.body.username)){
      var token = jwt.sign({ username : req.body.username }, 'mySecretKey',{ expiresIn: '30s' });
      res.json({
        token: token
      });
    }else{
      res.status(404).send("Incorrect Credentials");
    }
  });

});

/* check the jwt token for username*/
router.post('/checkjwt', function(req, res, next) {
  try {
    var decodedtoken = jwt.verify(req.headers.token, 'mySecretKey');
  } catch (error) {
    console.log(error);
  }
 
  if(decodedtoken && decodedtoken.username == "viragjain503"){
    res.status(200).json({
      message : "Correct token buddy"
    });
  }else{
    res.status(400).send("Wrong token details buddy");
  }
});

module.exports = router;
