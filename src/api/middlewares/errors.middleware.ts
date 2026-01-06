import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/error.handler";
import { ApiResponse } from "../utils/api.response";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {

    return ApiResponse.error(res, err.data,err.message , err.statusCode);
  }

  // Errores inesperados
  console.error(err,"asdlaksdhasdkad");
  return ApiResponse.error(res, {message:err.message},"Internal Server Error", 500);
}
