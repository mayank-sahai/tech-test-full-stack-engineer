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

      let launchPadDetailResult = await spaceService.getLandingPadDetails(id);
      if (launchPadDetailResult.length == 0) {
        logger.info('Landing Pad Details not found in DB, fetching from SpaceX');

        launchPadDetailResult = await spaceService.getLandingPadDetailsFromSpaceX(id);

        logger.info('Landing Pad Details recieved from SpaceX');

        spaceService.storingLandingPadDetails(launchPadDetailResult);

        res.data = {
          id: launchPadDetailResult.side_id, full_name: launchPadDetailResult.site_name_long, status: launchPadDetailResult.status, location: launchPadDetailResult.location,
        };
        next();
      } else {
        logger.info('Landing Pad Details recieved from DB');
        const data = JSON.parse(launchPadDetailResult[0].spaceItem);
        data.id = launchPadDetailResult[0].id;
        res.data = data;
        next();
      }
    } catch (err) {
      logger.error(err.message);
      if (err.message == 'Not Found') {
        next(Boom.notFound('This launch pad site does not exists.'));
      } else {
        next(Boom.conflict(err.message));
      }
    }
  },

};
