import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import uuid4 from 'uuid4';
import Q from 'q';

import { getRefreshToken, setRefreshToken } from '../otp.util';

const publicKey = fs.readFileSync(path.join(`${__dirname}/../../keys/jwtPublic.key`), 'utf8');
const privateKey = fs.readFileSync(path.join(`${__dirname}/../../keys/jwtPrivate.key`), 'utf8');

const options = {
  jwtAccessTokenOptions: {
    // secret: privateKey,
    // publicKey: publicKey,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME || 120000,
    issuer: process.env.ISSUER || 'localhost',
    audience: process.env.AUDIENCE || 'localhost',
    algorithm: 'ES256',
  },
  jwtRefreshTokenOptions: {
    // secret: privateKey,
    // publicKey: publicKey,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || 864000000,
    issuer: process.env.ISSUER || 'localhost',
    audience: process.env.AUDIENCE || 'localhost',
    algorithm: 'ES256',
  },
};

const generateJWT = (payload, options) => {
  const deffered = Q.defer();
  jwt.sign(payload, privateKey, options, (error, token) => {
    if (error) deffered.reject(error);
    else deffered.resolve(token);
  });

  return deffered.promise;
};

const verifyJWT = (token, options) => {
  const deffered = Q.defer();
  jwt.verify(token, publicKey, options, (error, payload) => {
    if (error) deffered.reject(error);
    else deffered.resolve(payload);
  });

  return deffered.promise;
};

const getAuthTokens = async id => {
  const sid = uuid4();
  const jwtAccessTokenPayload = { sub: id, sid };
  const jwtRefreshTokenPayload = { sub: id, sid };

  const accessToken = await generateJWT(jwtAccessTokenPayload, options.jwtAccessTokenOptions);
  const refreshToken = await generateJWT(jwtRefreshTokenPayload, options.jwtRefreshTokenOptions);

  await setRefreshToken(sid, id);
  return {
    expiresAt: Date.now() + +options.jwtAccessTokenOptions.expiresIn,
    accessToken,
    refreshToken,
    tokenType: 'Bearer',
  };
};

const verifyAccessToken = async token => {
  return verifyJWT(token, options.jwtAccessTokenOptions);
};

const verifyRefreshToken = async token => {
  const payload = await verifyJWT(token, options.jwtRefreshTokenOptions);
  const id = await getRefreshToken(payload.sid);
  if (payload.sub === id) {
    return payload;
  }
  return null;
};

export { getAuthTokens, verifyAccessToken, verifyRefreshToken };
