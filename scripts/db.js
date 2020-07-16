const mongoose = require('mongoose');
const db = require("../config");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/flix"
  );