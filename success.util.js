import { Response } from 'express';

export const SuccessResponse = (res, data = {}, code = 200) => {
  const statusCode = code;
  res.status(statusCode);

  res.json({
    success: true,
    statusCode,
    data,
  });
};

export const CustomSuccessResponse = (res, body = {}, code = 200) => {
  const statusCode = code;
  body.statusCode = code;
  res.status(statusCode);
  body.success = true;
  res.json(body);
};
