import { Router } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = Router();
// POST /login - Login a user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user)
        return res.status(400).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: "Invalid password" });
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ token });
});
export default router;
