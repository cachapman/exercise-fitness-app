import jwt from "jsonwebtoken";

// Generate JWT with new user variable (can declare it with anything)
const generateToken = (response, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Generate JWT-cookie
  response.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies when in production mode
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 30 days
  });
};

export default generateToken;