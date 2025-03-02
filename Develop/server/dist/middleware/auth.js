import jwt from "jsonwebtoken";
export const authenticateToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ensure Request type allows `user` field
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Forbidden" });
    }
};
