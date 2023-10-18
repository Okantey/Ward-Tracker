import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"


// @desc auth user / set token
//route POST api/users/auth
// @access PUBLIC

const authUser = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Auth user" })
})
// @desc register user
//route POST api/users/register
// @access PUBLIC

const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body
  console.log(name)
  response.status(200).json({ message: "Register user" })
})

// @desc logout user
//route POST api/users/logout
// @access PUBLIC

const logoutUser = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Logout user" })
})

// @desc get user profile
//route GET api/users/profile
// @access PRIVATE

const getUserProfile = asyncHandler(async (request, response) => {
  response.status(200).json({ message: "Get user profile" })
})





export { authUser, registerUser, logoutUser, getUserProfile }