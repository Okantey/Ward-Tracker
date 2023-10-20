import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
// @desc auth user / set token
//route POST api/users/auth
// @access PUBLIC

const authUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    response.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc register user
//route POST api/users/register
// @access PUBLIC

const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(user._id);
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    response.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc logout user
//route POST api/users/logout
// @access PUBLIC

const logoutUser = (request, response) => {
  response.status(200).json({ message: 'Logged out successfully' });
};


// @desc get user profile
//route GET api/users/profile
// @access PRIVATE

const getUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    response.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);

  if (user) {
    user.name = request.body.name || user.name;
    user.email = request.body.email || user.email;

    if (request.body.password) {
      user.password = request.body.password;
    }

    const updatedUser = await user.save();

    response.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    response.status(404);
    throw new Error('User not found');
  }
});





export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }