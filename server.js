const express = require('express');
const mongoose = require("mongoose");
const app = express();



app.use( express.json({ extended: true }));

// App port
const PORT = process.env.PORT || 3000;

// database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/flix", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Start app
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });