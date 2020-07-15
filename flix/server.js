//code for this file from https://medium.com/better-programming/how-to-deploy-your-react-app-to-heroku-aedc28b218ae//
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');


if (process.env.NODE_ENV === "production")
app.use(express.static("client/build"));

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log ('Server is up!');
});