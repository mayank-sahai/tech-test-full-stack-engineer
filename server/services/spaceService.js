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

  getLandingPadDetails: async (launchPadId) => {
    const queryResponse = await dbPool.query(
      `SELECT * FROM spaceData where id='${launchPadId}'`,
    );

    return queryResponse;
  },

  storingLandingPadDetails: async (launchPadDetails) => {
    const queryResponse = await dbPool.query(
      `INSERT INTO spaceData (id, spaceItem) VALUES ('${launchPadDetails.site_id
      }', '${JSON.stringify({
        full_name: launchPadDetails.site_name_long,
        status: launchPadDetails.status,
        location: launchPadDetails.location,
      })}')`,
    );
    return queryResponse;
  },

  getLandingPadDetailsFromSpaceX: async (launchPadId) => {
    try {
      const launchPadDetails = await axios({
        headers: {
          contentType: 'application/json',
        },
        method: 'GET',
        url: `https://api.spacexdata.com/v3/launchpads/${launchPadId}`,
      });
      return launchPadDetails.data;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  },

};
