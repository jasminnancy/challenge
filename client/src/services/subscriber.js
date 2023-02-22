const axios = require("axios");

const URL = "https://sleepy-mountain-03235.herokuapp.com";
const SUBSCRIBER_ENDPOINT = URL + "/api/subscribers";

export const getSubscribers = (params = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.get(SUBSCRIBER_ENDPOINT, {
    params: params,
    headers: headers,
  });
};

export const createSubscriber = (payload = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.post(SUBSCRIBER_ENDPOINT, payload, {
    headers: headers,
  });
};

export const updateSubscriber = (subscriberId, payload = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };

  return axios.patch(`${SUBSCRIBER_ENDPOINT}/${subscriberId}`, payload, {
    headers: headers,
  });
};
