const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const exercises = require("./routes/api/exercises");
const userChallenges = require("./routes/api/userChallenges");
const challenges = require("./routes/api/challenges");
const contact = require("./routes/api/contact");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());
app.use(cors());

// DB Config
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/exercises", exercises);
app.use("/api/user-challenges", userChallenges);
app.use("/api/contact", contact);

//app.use("/api/challenges", challenges); // Only enable for database updates

// Configure Express to also serve frontend
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})