import jwt from "jsonwebtoken";
import { UserModel } from "@/infrastructure/database/mongo/models/User.model";
import { AuthSocket, AuthTokenPayload } from "@/types/socket";
import type { ExtendedError } from "socket.io/dist/namespace";


export const authMiddleware = async (socket: AuthSocket, next: (err?: ExtendedError) => void) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("No token provided"));
    
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as AuthTokenPayload
    
    const userId = decoded.data.userId
    const user = await UserModel.findById(userId).select("_id email username roles");
    if (!user) return next(new Error("User not found"));
   
    socket.userId = user._id.toString();
    next();
  } catch (err) {
    console.log(err,"err socket")
    next(new Error("Authentication error"));
  }
};
