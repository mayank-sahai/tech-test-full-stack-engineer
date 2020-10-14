/** ********************** Require Node modules ********************* */
const JOI = require('joi');
const Boom = require('boom');

/** ********************** Require Local modules ********************* */
const { logger } = require('../utils');

const schema = {

  '/capsules': {
    params: null,
    body: null,
    query: null,
  },

  '/landing-pads': {
    params: null,
    body: null,
    query: JOI.object().keys({
      id: JOI.string().required(),
    }),
  },

};

module.exports = async (req, res, next) => {
  try {
    if (schema[req.route.path, req.route.path].body) {
      // Body validation
      await JOI.validate(req.body, schema[req.route.path].body);
    }
    if (schema[req.route.path].params) {
      // Param validation
      await JOI.validate(req.params, schema[req.route.path].params);
    }
    if (schema[req.route.path].query) {
      await JOI.validate(req.query, schema[req.route.path].query);
    }
    next();
  } catch (err) {
    logger.error('Error in API validation', err.details[0].message);
    next(Boom.badData(err.details[0].message));
  }
};
