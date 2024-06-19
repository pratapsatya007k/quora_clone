const router = require("express").Router();
const passport = require("passport");

// ... (rest of your code)

//Require User Model
const User = require("../models/user");

//create passport local strategy
passport.use(User.createStrategy());

//Serialize and deserialize user
passport.serializeUser(User.serializeUser());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// */
passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//register user in db
router.post("/signup", async (req, res) => {
  try {
    //register user
    const registerUser = await User.register(
      { username: req.body.username },
      req.body.password
    );
    if (registerUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    } else {
      res.redirect("/signup");
    }
  } catch (err) {
    res.send(err);
  }
});

// Login user
router.post("/index", (req, res) => {
  //create new user object
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  //using passport Login method we will check if user credentials are correct or not
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
    // I
  });
});

//Logout user
// router.get("/auth/logout", (req, res) => {
//   //use passport Logout method
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     } else res.redirect("/register");
//   });
// });

module.exports = router;
