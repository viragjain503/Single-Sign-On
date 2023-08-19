var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const fs = require("fs");

/* Writing client */
router.post('/submitclient', function(req, res, next) {
  fs.readFile("./db/clients.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    const clientFile = JSON.parse(jsonString);
    let clients = clientFile.clients;
    let clientObject = {
        clientId : req.body.clientId,
        clientSecret : req.body.clientSecret
    }
    clients = [clientObject];
    clientFile.clients = clients;
    const updatedClientFile = JSON.stringify(clientFile);

    // Write the updated JSON data back to the file
    fs.writeFile('./clients.json', updatedClientFile, 'utf8', (writeErr) => {
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

router.get('/getClient', function(req, res, next) {
    fs.readFile("./clients.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }
  
      const clientFile = JSON.parse(jsonString);
      let clients = clientFile.clients;
      res.json(clients[0]);
    });
  
  });
module.exports = router;
