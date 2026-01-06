export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public data: any;


  constructor(message: string, statusCode = 500, isOperational = true,data:any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database error",data?:any) {
     super(message, 500, true, data);
  }
}

export class AuthError extends AppError {
  constructor(message = "Authentication",data?:any) {
     super(message, 401, true, data);
  }
}


export class JwtTokenError extends AppError {
  constructor(message = "JWT",data?:any) {
     super(message, 401, true, data);
  }
}


export class ValidationError extends AppError {
  constructor(message = "Validation failed",data?:any) {
     super(message, 400, true, data);
  }
}
