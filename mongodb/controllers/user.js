const express = require("express");

const userModel = require("../models/user");

async function getAllUsers(req, res) {
  const allUsers = await userModel.find();
  return res.send(allUsers);
}

async function getUserById(req, res) {
  const id = await userModel.findById(req.params.id);
  return res.json(id);
}

async function getUserandUpdate(req, res) {
  await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  return res.json({ message: "User updated successfully" });
}

async function getUserandDelete(req, res) {
  await userModel.findByIdAndDelete(req.params.id);
  return res.json({ message: "User deleted successfully" });
}

async function createUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(401).json({ message: "All Fields are Required" });
  }
  try {
    const result = await userModel.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserandUpdate,
  getUserandDelete,
  createUser,
};
