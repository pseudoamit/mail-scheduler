const axios = require('../utility/axios');
const jobModel = require('../models/job');

const exportable = {
  // Create Scheduling
  create: async (req, res) => {
    try {
      const { time, subject, email, body } = req.body;
      const result = await axios.post('/mail/batch', {});

      const jobData = {
        email,
        time,
        subject,
        body,
        batchId: result.data.batch_id,
      };
      const data = await jobModel.create(jobData);

      if (data) {
        const recipient = data.email.map((e) => ({
          email: e,
        }));
        const mailObject = {
          personalizations: [
            {
              to: recipient,

              subject: data.subject,
            },
          ],
          from: { email: 'aroy9930@gmail.com', name: 'Amit Roy' },
          reply_to: { email: 'aroy9930@gmail.com', name: 'Amit Roy' },
          // eslint-disable-next-line radix
          send_at: parseInt((new Date(data.time).getTime() / 1000).toFixed(0)),
          subject: 'Test',
          content: [
            {
              type: 'text/plain',
              value: data.body,
            },
          ],
          batch_id: data.batchId,
        };
        await axios.post('/mail/send', mailObject);
      }
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Get list of data
  list: async (req, res) => {
    try {
      const data = await jobModel.find();
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Get data based on id
  read: async (req, res) => {
    try {
      const data = await jobModel.findById(req.params.id);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Update scheduling
  update: async (req, res) => {
    try {
      const id = req.body._id;
      const updatedData = req.body;
      delete updatedData._id;
      const data = await jobModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (data) {
        const recipient = data.email.map((e) => ({
          email: e,
        }));
        const mailObject = {
          personalizations: [
            {
              to: recipient,
              subject: data.subject,
            },
          ],
          from: { email: 'aroy9930@gmail.com', name: 'Amit Roy' },
          reply_to: { email: 'aroy9930@gmail.com', name: 'Amit Roy' },
          // eslint-disable-next-line radix
          send_at: parseInt((new Date(data.time).getTime() / 1000).toFixed(0)),
          subject: 'Test',
          content: [
            {
              type: 'text/plain',
              value: data.body,
            },
          ],
          batch_id: data.batchId,
        };
        await axios.post('/mail/send', mailObject);
      }
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Cancel scheduling
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await jobModel.findOneAndUpdate(
        { _id: id, deleted: false },
        { deleted: true },
        { new: true }
      );
      if (data) {
        await axios.post('/user/scheduled_sends', {
          batch_id: data.batchId,
          status: 'pause',
        });
      }
      res.send({ message: 'Deleted successfully!' });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Listing all the failed or unsent scheduling
  fail: async (req, res) => {
    try {
      const { data } = await axios.get('/user/scheduled_sends');
      const arr = data.map((r) => r.batch_id);
      const result = await jobModel.find({
        batchId: { $in: arr },
      });
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = exportable;
