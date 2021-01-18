import { Role } from '../typeDefs/Clinic';

const jwt = require('jsonwebtoken');

export type User = {
  id: number;
  roles: Role[];
};

export const getUser = (req: any) => {
  const auth = req.headers.authorization || '';

  if (!auth) return null;

  const token = auth.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user as User;
  } catch (error) {
    return null;
  }
};
