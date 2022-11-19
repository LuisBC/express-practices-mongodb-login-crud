import User from "../models/User";
import passport from "passport";

export const renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let errorMessage = "";
  if (req.body.password !== req.body.confirm_password) {
    errorMessage = "Password do not match.";
  } else if (req.body.password.length < 4) {
    errorMessage = "Password must be at least 4 characters.";
  } else {
    const emailUser = await User.findOne({ email });
    if (emailUser) errorMessage = "The email is already in use.";
  }

  if (errorMessage) {
    req.flash("error_msg", errorMessage);
    res.locals.error_msg = req.flash("error_msg"); // Show error message before render
    res.render("users/signup", { name, email, errorMessage });
  } else {
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "You are registered");
    res.redirect("/users/signin");
  }
};

export const signin = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true,
});

export const renderSignInForm = (req, res) => {
  res.render("users/signin");
};

export const logout = (req, res) => {
  req.logout(() => {
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/users/signin");
  });
};
