import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";

import { Action } from "../../types/actions";
import { ApiResponse } from "../utils/api.response";

// Permite solo usuarios con un rol específico
export function requirePermissionRole(action: Action) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById((req as any).userId).select(
        "_id username roles"
      ).populate("roles");

      if (!user) throw new Error("User not found");

      const isPermit = user.roles.some((rol: any) => {
        return rol.permissions.includes(action);
      });

      if (!isPermit) {
        throw new Error("Forbidden: insufficient role");
      }

      next();
    } catch (error: any) {
      ApiResponse.error(res, {
        authroization: error.message,
      });
    }
  };
}

// Permite usuarios con uno de varios roles
