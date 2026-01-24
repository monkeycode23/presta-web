import { Response } from "express";

type TApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
};

export class ApiResponse {
  static success<T>(res: Response, data?: T, message?: string, status = 200) {
    //console.log(data)
    const response: TApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(status).json(response);
  }

  static error(res: Response, errors: any, message?: string, status = 400) {
    const response: ApiResponse = {
      success: false,
      message,
      errors,
    };
    return res.status(status).json(response);
  }
}
