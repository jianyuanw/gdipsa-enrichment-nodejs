const express = require('express');
const router = express.Router();
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.redirect('/help.html');
});

router.get('/:data', (req, res) => {
  const data = req.params.data;
  const ec_level = req.query.ec_level || 'M';
  const type = req.query.type || 'png';
  console.log(`ec_level = ${ec_level}`);
  console.log(`type = ${type}`);

  const code = qr.imageSync(data, { ec_level, type });
  const filePath = path.join(__dirname, '..' , 'images', uuidv4() +  '.' + type);
  fs.writeFileSync(filePath, code);
  
  res.sendFile(filePath);
});

router.post('/', (req, res) => {
  const body = req.body;
  const data = body.data;
  const ec_level = req.query.ec_level || 'M';
  const type = req.query.type || 'png';
  console.log(`ec_level = ${ec_level}`);
  console.log(`type = ${type}`);
  
  const code = qr.imageSync(data, { ec_level, type });
  const filePath = path.join(__dirname, '..' , 'images', uuidv4() +  '.' + type);
  fs.writeFileSync(filePath, code);
  
  res.sendFile(filePath);
});

module.exports = router;