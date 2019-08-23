const places = require("./places");

module.exports = function(app, db) {
  places(app, db);
};
