const axios = require("axios");
var JSONStream = require("JSONStream");
var mongoose = require("mongoose");

const keyApi = require("../util/key");
const psw = require("../util/credentials");

mongoose.connect(
  "mongodb://menson:" +
    encodeURIComponent(`${psw.password}`) +
    "@ds211708.mlab.com:11708/places"
);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

var Schema = mongoose.Schema;

var placeSchema = new Schema({
  name: String,
  formatted_address: String
});

var Places = mongoose.model("Place", placeSchema);

module.exports = function(app, db) {
  app.get("/place/:type/:name", (req, res) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
          req.params.type
        }+in+${req.params.name}&key=${keyApi.apiKey}`
      )
      .then(function(response) {
        if (response.data.status == "OK") {
          res.send(response.data.results);
        } else {
          res.status(400).send("Error");
        }
      })
      .catch(function(error) {
        res.status(500).send("There was an error!");
      });
  });

  app.get("/place/:type/:name/save", (req, res) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
          req.params.type
        }+in+${req.params.name}&key=${keyApi.apiKey}`
      )
      .then(function(response) {
        if (response.data.status == "OK") {
          res.send(response.data.results);

          var Place;
          for (var i = 0; i <= response.data.results.length; i++) {
            Place = new Places({
              name: response.data.results[i].name,
              formatted_address: response.data.results[i].formatted_address
            });

            Place.save(function(error) {
              console.log("Your bee has been saved!");
              if (error) {
                console.error(error);
              }
            });
          }
        } else {
          res.status(400).send("Error");
        }
      })
      .catch(function(error) {
        res.status(500).send("There was an error!");
      });
  });

  app.get("/places/saved", (req, res) => {
    Places.find()
      .cursor()
      .pipe(JSONStream.stringify())
      .pipe(res.type("json"));
  });
};
