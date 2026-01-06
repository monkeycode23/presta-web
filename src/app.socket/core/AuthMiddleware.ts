import jwt from "jsonwebtoken";
import User from "../../../src/api/models/User.model";
import { AuthSocket, AuthTokenPayload } from "../../types/authSocket";
import type { ExtendedError } from "socket.io/dist/namespace";


export const authMiddleware = async (socket: AuthSocket, next: (err?: ExtendedError) => void) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("No token provided"));
    //console.log(token,"token socket")

    
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as AuthTokenPayload
    //socket.decoded = decoded;

    //console.log(decoded,"decoded socket")
    const userId = decoded.data.userId
    const user = await User.findById(userId).select("_id email userename roles");
    if (!user) return next(new Error("User not found"));
   // console.log(user,"user socket")
    socket.user = user ;
    next();
  } catch (err) {
    console.log(err,"err socket")
    next(new Error("Authentication error"));
  }
};
