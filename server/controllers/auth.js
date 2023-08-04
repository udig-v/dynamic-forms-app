const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const createSecretToken = require("../util/secretToken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log(res);

  if (user) {
    const token = createSecretToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = createSecretToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      success: true,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ user });
});

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error: ", error);
    res.status(500).json({ error: "Server error", error });
  }
};

module.exports = { registerUser, authUser, logoutUser, getUser };
