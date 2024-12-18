import config from "@/config";
import {
  AppError,
  handleMongooseCastError,
  handleMongooseDuplicateIdError,
  handleMongooseValidationError,
  handleZodError,
} from "@/errors";
import { TErrorMessages } from "@/interface/error";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

// Not found Error Handler
const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  const err = new AppError(httpStatus.NOT_FOUND, "Not Found");
  res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
  });
};

// Global Error Handler
const global: ErrorRequestHandler = (error, _req, res, _next) => {
  let statusCode = 500;
  let message = "something went wrong";
  let errorMessages: TErrorMessages = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "ValidationError") {
    const simplifiedError = handleMongooseValidationError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleMongooseCastError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.code === 11000) {
    const simplifiedError = handleMongooseDuplicateIdError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof JsonWebTokenError) {
    statusCode = 401;
    message = error.name;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === "development" ? error.stack : null,
    // error,
  });
};

export const errorHandler = {
  notFound,
  global,
};
