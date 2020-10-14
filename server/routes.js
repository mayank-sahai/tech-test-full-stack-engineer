/* ********************************* Import Local Modules ********************************* */
const {
  spaceController,
} = require('./controllers');
const { validator } = require('./middlewares');

module.exports = (app) => {
  // Get all Capsules
  app.get('/capsules', validator, spaceController.getAllCapsules);

  // Get details of a launch pad
  app.get('/landing-pads', validator, spaceController.getLandingPadDetails);

};
