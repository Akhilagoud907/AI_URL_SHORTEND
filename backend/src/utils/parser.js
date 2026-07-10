const UAParser = require("ua-parser-js");

const parseUserAgent = (userAgent) => {
  const parser = new UAParser(userAgent);

  const result = parser.getResult();

  return {
    browser: result.browser.name || "Unknown",

    os: result.os.name || "Unknown",

    device:
      result.device.type ||
      "Desktop",
  };
};

module.exports = parseUserAgent;