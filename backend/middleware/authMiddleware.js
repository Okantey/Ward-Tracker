import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (request, response, next) => {
  let token;

  token = request.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      request.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      response.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    response.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };