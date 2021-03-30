import { Role } from '../typeDefs/Clinic';

const jwt = require('jsonwebtoken');

export type User = {
  id: number;
  roles: Role[];
};

export const getUser = (auth: string | undefined) => {
  if (!auth) return null;

  const token = auth.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user as User;
  } catch (error) {
    return null;
  }
};

type PaginateProps = {
  after?: string;
  pageSize?: number;
  results: any[];
};

export const paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
}: PaginateProps) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize); // no cursor so returning first batch of results

  const cursorIndex = results.findIndex((item) => {
    return item.id === parseInt(cursor);
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1  // if cursor index is the last el in arr returns empty arr
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
