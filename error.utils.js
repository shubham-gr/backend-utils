export const throwError = error => {
  const { code, message, customCode } = error;
  const err = new Error(message);
  err.status = code;
  err.customCode = customCode;
  err.expose = true;

  throw err;
};

export const ErrorResponse = (res, error) => {
  const errorText = error.detail || error.message || error;
  const statusCode = error.customCode || error.status || 500;

  res.status(error.status || 500);
  res.json({
    success: false,
    statusCode,
    error: errorText,
  });
};
