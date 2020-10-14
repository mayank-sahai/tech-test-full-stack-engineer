import axios from 'axios';

// Custom Imports
import { API_URL } from './constant';

function getCapsules() {
  return axios({
    headers: {
      contentType: 'application/x-www-form-urlencoded',
    },
    method: 'GET',
    url: `${API_URL}/capsules`,
  });
}

function getLandingPadDetails(id) {
    return axios({
      headers: {
        contentType: 'application/x-www-form-urlencoded',
      },
      method: 'GET',
      url: `${API_URL}/landing-pads?id=${id}`,
    });
  }


export default {

    getCapsules,
    getLandingPadDetails
  
};