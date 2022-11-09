import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { JwtPayloadInfo } from '../interfaces/common/JwtPayloadInfo';

const getToken = (userId: number): string => {
  const payload: JwtPayloadInfo = {
    user: {
      id: userId,
    },
  };
  const accessToken: string = jwt.sign(payload, config.jwtSecret, {
    expiresIn: '14d',
  });

  return accessToken;
};

const verifyToken = (token: string) => {
  let decoded;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error: any) {
    console.log(error);
    if (error.message === 'jwt expired') {
      return 'expired_token';
    } else {
      return 'invalid_token';
    }
  }
};

export default { getToken, verifyToken };
