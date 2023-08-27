const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs').promises; // Import fs with promises

async function generateObject(body) {
  try {
    const jsonString = await fs.readFile('./db/clients.json', 'utf8');
    const clientsFile = JSON.parse(jsonString);
    const clients = clientsFile.clients;
    const client = clients.find(client => client.clientId === body.clientId);
    return {
      clientId: body.clientId,
      username: body.username,
      permissions: client.permissions,
    };
  } catch (err) {
    console.log('File read failed for users:', err);
    throw err; // Rethrow the error to handle it further up
  }
}

async function requiredUtils(body) {
  try {
    const jsonString = await fs.readFile('./db/clients.json', 'utf8');
    const clientsFile = JSON.parse(jsonString);
    const clients = clientsFile.clients;
    const client = clients.find(client => client.clientId === body.clientId);
    return {
      clientSecret: client.clientSecret,
      redirectPage: client.redirectPage,
      expiresIn: client.expiresIn,
    };
  } catch (err) {
    console.log('File read failed for users:', err);
    throw err; // Rethrow the error to handle it further up
  }
}

/* CREATE JWT token first time */
router.post('/signdetails', async (req, res, next) => {
  try {
    const jsonString = await fs.readFile('./db/customer.json', 'utf8');
    const customer = JSON.parse(jsonString);

    // Check if client exists or not
    const users = customer.users;
    if (users.includes(req.body.username)) {
      const jwtObject = await generateObject(req.body);
      const utilsObject = await requiredUtils(req.body);
      
      const token = jwt.sign({ jwtObject: jwtObject }, utilsObject.clientSecret, {
        expiresIn: '15m',
      });
      
      res.json({
        token: token,
        redirectPage: utilsObject.redirectPage,
        permissions: jwtObject.permissions,
      });
    } else {
      res.status(404).send('Incorrect Credentials');
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* check the jwt token for username */
router.post('/checkjwt', (req, res, next) => {
  try {
    const decodedtoken = jwt.verify(req.headers.token, 'mySecretKey');

    if (decodedtoken && decodedtoken.jwtObject.username) {
      res.status(200).json({
        message: 'Correct token buddy',
      });
    } else {
      res.status(400).send('Wrong token details buddy');
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
