const express = require('express');
const mongoose = require('mongoose');
const keys = require('./src/config/keys');

const app = express();

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Successfully connected to the Database'))
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log('Error connecting the database');
  });
app.use(express.json());

const jobRouter = require('./src/routers/job');

app.use('/job', jobRouter);

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('Server has started at 5000 PORT');
});
