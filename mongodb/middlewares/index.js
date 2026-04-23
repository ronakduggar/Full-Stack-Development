const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `Request received on: ${req.method} - ${req.path}\n`,
      () => {
        next();
      },
    );
  };
}

module.exports = { logReqRes };
