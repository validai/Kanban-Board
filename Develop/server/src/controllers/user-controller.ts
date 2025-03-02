import { Request, Response } from "express";
import { User } from "../models/user";

// Fetch all users (excluding passwords)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update user details
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update({ username, password });

    return res.json({ message: "User updated successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    return res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
