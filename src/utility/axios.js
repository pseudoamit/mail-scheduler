const axios = require('axios').default;
const keys = require('../config/keys');

module.exports = axios.create({
  baseURL: 'https://api.sendgrid.com/v3',
  headers: { authorization: `Bearer ${keys.sendgridAPI}` }
});
