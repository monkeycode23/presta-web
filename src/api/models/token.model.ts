import mongoose, { Schema, Document, Types } from "mongoose";

export interface IResetToken extends Document {
  userId: Types.ObjectId;
  token: string;       // JWT o código temporal
  type: string;        // 'password-reset', 'email-verify', etc.
  expiresAt: Date;     // Para expiración automática
  createdAt: Date;
}

const TokenSchema: Schema = new Schema<IResetToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  type: { type: String, required: true, default: "refresh-token" },
  expiresAt: { type: Date },
  
},{timestamps: { createdAt: true, updatedAt: false }});

// Index para que Mongo borre automáticamente tokens expirados
TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TokenModel = mongoose.model<IResetToken>("Token", TokenSchema);