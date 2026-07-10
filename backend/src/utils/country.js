const axios = require("axios");

const getCountry = async (ip) => {
  try {

    if (
      ip === "::1" ||
      ip === "127.0.0.1"
    ) {
      return "Localhost";
    }

    const response = await axios.get(
      `http://ip-api.com/json/${ip}`
    );

    return (
      response.data.country ||
      "Unknown"
    );

  } catch (err) {

    return "Unknown";

  }
};

module.exports = getCountry;