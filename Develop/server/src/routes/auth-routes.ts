import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
  username: string;
}


const authenticateToken: RequestHandler = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default authenticateToken;
