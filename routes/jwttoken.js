var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* CREATE JWT token first time*/
router.post('/signdetails', function(req, res, next) {
  var token = jwt.sign({ username : req.body.username }, 'mySecretKey',{ expiresIn: '30s' });
  res.send({
    token: token
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
      message : "correct token buddy"
    });
  }else{
    res.status(400).send("Wrong token buddy");
  }
});

module.exports = router;
