const axios = require("axios");

const baseUrl = "https://sirius-food.herokuapp.com/";
const localUrl = "http://localhost:8000/";

/* module with the most used httpFunction in the app */

export const httpGet = async (endpoint) =>
  axios.get(baseUrl + endpoint, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const httpGet2 = async (endpoint) =>
  axios.get(localUrl + endpoint, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const httpPost = async (endpoint, data) =>
  axios.post(baseUrl + endpoint, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const httpPut = async (endpoint, data) =>
  axios.put(baseUrl + endpoint, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
export const httpPut2 = async (endpoint, data) =>
  axios.put(endpoint, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
    },
  });

export const httpDelete = async (endpoint) => {
  const token = localStorage.getItem("token");
  return axios.delete(baseUrl + endpoint, {
    headers: token
      ? {
          authorization: `Bearer ${token}`,
        }
      : {},
  });
};
