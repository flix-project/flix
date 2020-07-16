const mongoose = require('mongoose');
const db = require("../model");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/flix"
  );