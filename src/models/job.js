const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobSchema = new Schema({
  email: [{ type: String }],
  message: { type: String },
  time: { type: Date },
  subject: { type: String },
  body: { type: String },
  deleted: { type: Boolean, default: false },
  batchId: { type: String }
});

module.exports = mongoose.model('Job', jobSchema);
