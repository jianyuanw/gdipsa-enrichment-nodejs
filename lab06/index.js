const express = require('express');
const app = express();
const morgan = require('morgan');
const qrRouter = require('./routers/qr');

app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/help.html', express.static(__dirname));

app.use('/qr', qrRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000.');
});