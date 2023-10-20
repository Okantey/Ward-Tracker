import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (request, response, next) => {
  let token;

  if (request.cookies.jwt) {
    token = request.cookies.jwt;
  }
  else if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    token = request.headers.authorization.split(' ')[1];
  }

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
