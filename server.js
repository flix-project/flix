const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
//if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
//}


// App port
const PORT = process.env.PORT || 3000;


// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
//app.get("*", function(req, res) {
//  res.sendFile(path.join(__dirname, "./client/build/index.html"));
//});
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/flix");


// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });