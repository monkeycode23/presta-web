import { Schema, model } from "mongoose";
import { IUser } from "@/types/general";


const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: "https://i.pravatar.cc/32" },
    bio: { type: String, default: null },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    terms: { type: Boolean, default: false },
    privacy: { type: Boolean, default: false },
    tokens: [
      {
        type: Schema.Types.ObjectId,
        ref: "Token",
        default: null,
      },
    ],
    roles: {
      type: [{ type: Schema.Types.ObjectId, ref: "Role" }],
    },

    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],

    rooms: [
      {
        room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
        lastMessageRead: { type: Date, default: null }, // o String si prefieres
      },
    ],

    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],

    // 2FA opcional
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export const UserModel = model("User", UserSchema);

