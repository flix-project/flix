const express = require('express');

const mongoose = require("mongoose");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// App port
const PORT = process.env.PORT || 3000;


// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/flix");


// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });