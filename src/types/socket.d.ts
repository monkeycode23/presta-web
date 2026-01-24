
import { Socket } from "socket.io";

// 🔹 1️⃣ Extiende el tipo base de Socket
export interface AuthSocket extends Socket {
  userId: string
}



export interface AuthTokenPayload extends IUser {
  data:{userId: string}
  iat: number;
  exp: number;
}

/* 

export type IUser = typeof User & {
    _id: string|undefined;
    username: string;
    email: string;
    // otros campos relevantes del usuario
};


 */
