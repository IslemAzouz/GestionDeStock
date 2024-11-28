const User = require("../model/authModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "chaimabahi<33", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { firstName: "", lastName: "", email: "", phone: "", password: "", agreeTerms: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, agreeTerms } = req.body;
    

    const user = await User.create({ firstName, lastName, email, phone, password, agreeTerms });
    
    // Create JWT token
    const token = createToken(user._id);

    // Send the token as a cookie
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    // Respond with the user ID and success status
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

      // Set the JWT token as a cookie
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });

      // Include the token in the response JSON
      res.status(200).json({ user: user._id, token, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};
