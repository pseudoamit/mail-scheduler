module.exports = {
  validate: (
    schema = {
      headers: null,
      params: null,
      query: null,
      body: null,
    }
  ) => (req, res, next) => {
    let isValid = false;
    let result = null;

    if (schema.body) {
      result = schema.body.validate(req.body);
      isValid = result.error === undefined;
    }
    if (isValid) {
      next();
    } else {
      const { details } = result.error;
      const message = details.map((item) => item.message).join(',');
      res.status(400).json({ message });
    }
  },
  // eslint-disable-next-line global-require
  jobSchemas: require('./job'),
};
