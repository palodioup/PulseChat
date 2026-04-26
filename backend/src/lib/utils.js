import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // prevent XSS attacks 
    sameSite: 'strict', // prevent CSRF attacks
    secure: process.env.NODE_ENV === 'production' ? false : true // use secure cookies in production
  });

  return token;
};