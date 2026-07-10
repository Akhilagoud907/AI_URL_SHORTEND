const parseUserAgent = require("../utils/parser");

const getCountry = require("../utils/country");

exports.collectAnalytics = async (req) => {

  const userAgent =
    req.headers["user-agent"];

  const parser =
    parseUserAgent(userAgent);

  const ip =
    req.ip ||
    req.connection.remoteAddress;

  const country =
    await getCountry(ip);

  const referrer =
    req.headers.referer ||
    "Direct";

  return {

    browser:
      parser.browser,

    os:
      parser.os,

    device:
      parser.device,

    country,

    referrer,

  };
};