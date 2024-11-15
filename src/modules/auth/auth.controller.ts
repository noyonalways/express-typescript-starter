import { catchAsync, sendResponse } from "@/utils";
import authService from "./auth.service";

const login = catchAsync(async (req, res) => {
  // Implement your login logic here
  const result = await authService.login();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Logged in successfully",
    data: result,
  });
});

const register = catchAsync(async (req, res) => {
  // Implement your register logic here
  const result = await authService.register();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Register successfully",
    data: result,
  });
});

export default {
  login,
  register,
};
