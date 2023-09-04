import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protectRoute = asyncHandler(async (request, response, next) => {
  let token;

  // Using cookieParser middleware
  token = request.cookies.jwt; 

  if (token) {
    try {
      // Verify token information
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

     // Get user information from generated token
     // decoded.keyId must match same variable in generateToken.js
     request.user = await User.findById(decoded.keyId).select("-password");

     next();
    } catch (error) {
      response.status(401);
    throw new Error("Not authorized, invalid token!");
    }
  } else {
    response.status(401);
    throw new Error("Not authorized, no token!");
  }
});

export { protectRoute };