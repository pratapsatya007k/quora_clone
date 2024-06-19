require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const cors = require('cors');
const fs = require('fs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./src/models/user");

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();

// API Routes
const spaceRoute = require("./src/routes/createSpaceRoute");
const quesRoute = require("./src/routes/QuestionRoute");
const imageRoutes = require('./src/routes/imageRoutes');
const postRoute=require("./src/routes/postRoute");
const authRoute = require("./src/routes/auth");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(
    session({
        secret: 'your-secret-key', // Change this to a secure secret
        resave: false,
        saveUninitialized: false,
    })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Use Routes
app.use("/create", spaceRoute);
app.use("/question", quesRoute);
app.use("/post",postRoute);
app.use("/auth", authRoute);

// Serve the built frontend files
app.use(express.static(path.join(__dirname, 'build')));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// Use image routes
app.use('/api', imageRoutes);

// Serve the frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 279;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
