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
        clientSecret : req.body.clientSecret,
        expiresIn: req.body.expiresIn,
        permissions: req.body.permissions,
        redirectPage: req.body.redirectPage,
        email: req.body.email
    }
    
    clients.push(clientObject);
    clientFile.clients = clients;
    const updatedClientFile = JSON.stringify(clientFile);

    // Write the updated JSON data back to the file
    fs.writeFile('./db/clients.json', updatedClientFile, 'utf8', (writeErr) => {
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
    fs.readFile("./db/clients.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }

      const clientFile = JSON.parse(jsonString);
      let clients = clientFile.clients;
      const filteredClients = clients.filter(client => client.email === req.identifier || client.username === req.identifier);

      res.json(filteredClients);
    });
  
  });


/* Writing client */
router.delete('/deleteClient', function(req, res, next) {
  fs.readFile("./db/clients.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    const clientFile = JSON.parse(jsonString);
    let clients = clientFile.clients;

    clients = clients.filter(client => client.clientId !== req.body.clientId);

    clientFile.clients = clients;
    const updatedClientFile = JSON.stringify(clientFile);

    // Write the updated JSON data back to the file
    fs.writeFile('./db/clients.json', updatedClientFile, 'utf8', (writeErr) => {
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

function deleteClient(clientsArray, clientIdToDelete) {
  return 
}
module.exports = router;
