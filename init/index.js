const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const maptilerClient = require("@maptiler/client");

maptilerClient.config.apiKey = process.env.MAPTILER_TOKEN;

const MONGO_URL = "mongodb://127.0.0.1:27017/StayNest";

main()
  .then(() => {
    console.log("connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Geocoding sample data... please wait.");

    const processedData = [];
    for (let obj of initdata.data) {
      console.log(`Geocoding: ${obj.location}`);
      let response = await maptilerClient.geocoding.forward(obj.location, { limit: 1 });
      obj.geometry = response.features.length
        ? response.features[0].geometry
        : { type: 'Point', coordinates: [0, 0] };
      obj.owner = "698f1dc5c7643574530e5a7e";
      processedData.push(obj);
    }

    await Listing.insertMany(processedData);
    console.log("Data was initialized with coordinates!");
  } catch (err) {
    console.log("Error during initialization:", err);
  } finally {
    mongoose.connection.close();
  }
};