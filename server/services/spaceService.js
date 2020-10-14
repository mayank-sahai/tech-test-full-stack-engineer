/* ********************************* Import Node Modules ********************************* */
const axios = require('axios');

/* ********************************* Import Local Modules ********************************* */
const dbPool = require('../db');

module.exports = {

  getAllCapsules: async () => {
    try {
      const capsules = await axios({
        headers: {
          contentType: 'application/json',
        },
        method: 'GET',
        url: 'https://api.spacexdata.com/v3/capsules?sort=original_launch',
      });

      return capsules.data;
    } catch (err) {
      throw new Error(err);
    }
  },

  getLandingPadDetails: async (landingPadId) => {
    const queryResponse = await dbPool.query(
      `SELECT * FROM spaceData where id='${landingPadId}'`,
    );

    return queryResponse;
  },

  storingLandingPadDetails: async (landingPadDetails) => {
    const queryResponse = await dbPool.query(
      `INSERT INTO spaceData (id, spaceItem) VALUES ('${landingPadDetails.site_id
      }', '${JSON.stringify({
        full_name: landingPadDetails.site_name_long,
        status: landingPadDetails.status,
        location: landingPadDetails.location,
      })}')`,
    );
    return queryResponse;
  },

  getLandingPadDetailsFromSpaceX: async (landingPadId) => {
    try {
      const landingPadDetails = await axios({
        headers: {
          contentType: 'application/json',
        },
        method: 'GET',
        url: `https://api.spacexdata.com/v3/landpads/${landingPadId}`,
      });
      return landingPadDetails.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  },

};
