import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";

// @description   Authenticate user and set token
// @route         POST /api/users/auth
// @access        Public - can access URL without logging in
const authUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;
  
  // Check for user credentials with logic in userModel
  // Log in with either name and/or email with correct password
  const user = await User.findOne({$or: [{ name }, { email }]});

  if(user && (await user.matchPassword(password))) {
    generateToken(response, user._id);

    response.status(201).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      SavedExerciseList: [],
    });
  } else {
    response.status(401);
    throw new Error("Invalid credentials.");
  }
});

// @description   Register a new user
// @route         POST /api/users
// @access        Public - can access URL without logging in
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;

  if( !name || !email || !password ) {
    response.status(400);
    throw new Error("Please enter all required information.");
  }

  // Check if user exists
  const usernameExists = await User.findOne({ name });
  const userEmailExists = await User.findOne({ email });

  if(usernameExists || userEmailExists) {
    response.status(400);
    throw new Error("Username and / or Email already registered.");
  }

  // Create a new user 
  const user = await User.create({
    name,
    email,
    password,
    SavedExerciseList: [],
  });

  // Generate JWT-cookie along with response
  if(user) {
    generateToken(response, user._id);

    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      SavedExerciseList: [],
    });
  } else {
    response.status(401);
    throw new Error("Invalid user data.");
  }
}); 

// @description   Logout user and clear JWT-cookie
// @route         POST /api/users/logout
// @access        Public - can access URL without logging in
const logoutUser = asyncHandler(async (request, response) => {
  response.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  response.status(200).json({ message: "User logged out successfully" });
}); 

// @description   Get user profile
// @route         GET /api/users/profile
// @access        Private - can access URL only with token after logging in
const getUserProfile = asyncHandler(async (request, response) => {
  
  const user = await User.findById(request.user._id);
  
  if (user) {
    response.status(200).json({
      _id: request.user._id,
      name: request.user.name,
      email: request.user.email,
      SavedExerciseList: [],
    });

    // Test return data to confirm in console
    // console.log("request.user._id --- info below");
    // console.log(request.user._id);
    // console.log("request.user.id --- info below");
    // console.log(request.user.id);
    // console.log("----- user info below");
    // console.log(user);
    // console.log("====== done");

  } else {
    response.status(404);
    throw new Error("User not found");
  }
}); 

// @description   Update user profile
// @route         PUT /api/users/profile
// @access        Private - can access URL only with token after logging in
const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;

    if (request.body.password) {
      user.password = request.body.password;
    }

    const updatedUser = await user.save();

    response.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

export { 
  authUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile,
};