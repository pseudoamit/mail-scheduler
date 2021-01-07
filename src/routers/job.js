const express = require('express');

const router = express.Router();
const jobController = require('../controller/job');
const { validate, jobSchemas } = require('../validators');

// Route for create job scheduler
router.put('/', validate({ body: jobSchemas.create }), jobController.create);
// Route for update job scheduler
router.patch('/', validate({ body: jobSchemas.update }), jobController.update);
// Route for get the failed or unsent scheduler
router.get('/fail', jobController.fail);
// Route for get the list of data
router.get('/', jobController.list);
// Route for get a single record based on id parameter
router.get('/:id', jobController.read);
// Route for cancel job scheduler
router.delete('/:id', jobController.delete);

module.exports = router;
