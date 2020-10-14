const Boom = require('boom');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { spaceService } = require('../services');

module.exports = {

  getAllCapsules: async (req, res, next) => {
    try {
      logger.info('Request to get all Capsules');

      const capsulesResult = await spaceService.getAllCapsules();

      if (!capsulesResult) {
        next(Boom.conflict('Error while fetching capsule from SpaceX'));
      } else {
        logger.info('Capsules list recieved from SpaceX');

        res.data = capsulesResult;
        next();
      }
    } catch (err) {
      logger.error(err.message);
      next(Boom.conflict('Something went wrong'));
    }
  },

  getLandingPadDetails: async (req, res, next) => {
    try {
      logger.info('Request to get Landing Pad Details');
      const { id } = req.query;

      let landingPadDetailResult = await spaceService.getLandingPadDetails(id);
      if (landingPadDetailResult.length == 0) {
        logger.info('Landing Pad Details not found in DB, fetching from SpaceX');

        landingPadDetailResult = await spaceService.getLandingPadDetailsFromSpaceX(id);

        logger.info('Landing Pad Details recieved from SpaceX');

        spaceService.storingLandingPadDetails(landingPadDetailResult);

        res.data = {
          id: landingPadDetailResult.side_id, full_name: landingPadDetailResult.site_name_long, status: landingPadDetailResult.status, location: landingPadDetailResult.location,
        };
        next();
      } else {
        logger.info('Landing Pad Details recieved from DB');
        const data = JSON.parse(landingPadDetailResult[0].spaceItem);
        data.id = landingPadDetailResult[0].id;
        res.data = data;
        next();
      }
    } catch (err) {
      logger.error(err.message);
      if (err.message == 'Not Found') {
        next(Boom.notFound('This landing pad site does not exists.'));
      } else {
        next(Boom.conflict(err.message));
      }
    }
  },

};
