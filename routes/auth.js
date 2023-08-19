var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const fs = require("fs");
const nodemailer = require("nodemailer");

/* Writing client */
router.post('/signup', function(req, res, next) {
  fs.readFile("./db/users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed for users:", err);
      return;
    }

    const usersFile = JSON.parse(jsonString);
    let users = usersFile.users;
    let usersObject = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
    users.push(usersObject);
    usersFile.users = users;
    const updatedUsersFile = JSON.stringify(usersFile);

    // Write the updated JSON data back to the file
    fs.writeFile('./db/users.json', updatedUsersFile, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing to file:', writeErr);
            return;
        }
        res.json({
            status : "SUCCESS"
        });
    });

  });

});

router.get('/checkUsername', function(req, res, next) {
  fs.readFile("./db/users.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed for users:", err);
      return;
    }
    const usersFile = JSON.parse(jsonString);
    let users = usersFile.users;

    const isUsernameTaken = users.some(user => user.username.toLowerCase() === req.query.username.toLowerCase());
    res.json({
        isTaken: isUsernameTaken
    })
  });
});

router.get('/checkEmail', function(req, res, next) {
    fs.readFile("./db/users.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed for users:", err);
        return;
      }
      const usersFile = JSON.parse(jsonString);
      let users = usersFile.users;
  
      const isEmailTaken = users.some(user => user.email.toLowerCase() === req.query.email.toLowerCase());
      res.json({
          isTaken: isEmailTaken
      })
    });
  });

router.post('/login', function(req, res, next) {
    // console.log(req.body.identifier);
    // console.log(req.body.password);
    
fs.readFile("./db/users.json", "utf8", (err, jsonString) => {
    if (err) {
    console.log("File read failed for users:", err);
    return;
    }
    const usersFile = JSON.parse(jsonString);
    let users = usersFile.users;

    const validCredentials = users.some(user => (
        (user.email.toLowerCase() === req.body.identifier.toLowerCase() || user.username.toLowerCase() === req.body.identifier.toLowerCase())
            &&  
        (user.password === req.body.password)
    ));

    res.json({
        isValid: validCredentials
    })
});
});

module.exports = router;
