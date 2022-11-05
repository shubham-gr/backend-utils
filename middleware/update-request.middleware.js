import { ErrorResponse } from '../error.utils.js';
import { verifyAccessToken, verifyRefreshToken } from '../jwt.js';

export const updateRequest = async (req, res, next, errorCallback) => {
  try {
    const { body: payload, headers } = req;
    const token =
      headers.authorization && headers.authorization.split(' ')[1]
        ? headers.authorization.split(' ')[1]
        : null;
    if (token) {
      req.user = await verifyAccessToken(token);
      next();
    } else {
      throw new Error('Authentication Header is required');
    }
  } catch (error) {
    ErrorResponse(res, error);
  }
};

export const updateRefreshRequest = async (req, res, next) => {
  try {
    const { body: payload, headers } = req;
    const token =
      headers.authorization && headers.authorization.split(' ')[1]
        ? headers.authorization.split(' ')[1]
        : null;
    if (token) {
      req.user = await verifyRefreshToken(token);
      next();
    } else {
      throw new Error('Authentication Header is required');
    }
  } catch (error) {
    ErrorResponse(res, error);
  }
};
