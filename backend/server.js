const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const http = require('http');


// routes
const businessRoute = require("./routes/business.route");
const investorRoute = require("./routes/investor.route");
const chatRoute = require("./routes/chat.route");
const matchRoute = require("./routes/match.route");
const userRoute = require("./routes/user.route");
const initSocket = require("./socketio");

const dotenv = require("dotenv")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  

// bind routes
app.use("/api/business", businessRoute);
app.use("/api/investor", investorRoute);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/match", matchRoute);


const server = http.createServer(app); 

// init socket io
initSocket(server) 



server.listen(process.env.PORT, console.log("Server started"));


module.exports = app;

