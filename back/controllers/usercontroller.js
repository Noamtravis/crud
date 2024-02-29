const User = require("../models/Users");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  const { username, phoneNumber, email } = req.body;
  console.log(username);
  console.log(phoneNumber);
  console.log(email);
  try {
    const newUser = await User.create({
      username,
      phoneNumber,
      email,
    });
    res.sendStatus(200);
    console.log(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.finduser = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  try {
    existingUser = await User.findOne({ username: username });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(401).json("didnt find user");
    }
    res.status(200).json(existingUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateuser = async (req, res) => {
  try {
    const { username, phoneNumber, email } = req.body;

    // Update the user's information
    const user = await User.findOneAndUpdate(
      { username: username },
      { username, phoneNumber, email },
      { new: true } // Return the updated user
    );

    // Check if user was found and updated
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send success response
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.params);
    await User.deleteOne({ username: req.params.username });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
