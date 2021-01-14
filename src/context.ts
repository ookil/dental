import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
};

export function createContext(): Context {
  console.log('hello')
  return { prisma };
}
