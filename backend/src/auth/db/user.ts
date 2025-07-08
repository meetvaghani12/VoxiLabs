import { PrismaClient, User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      accounts: true,
      sessions: true,
    },
  });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      accounts: true,
      sessions: true,
    },
  });
};

export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  twoFactorSecret?: string;
  image?: string;
}): Promise<User> => {
  return prisma.user.create({
    data: userData,
  });
};

export const updateUser = async (email: string, data: Partial<Prisma.UserUpdateInput>): Promise<User> => {
  return prisma.user.update({
    where: { email },
    data,
  });
};

export const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.delete({
    where: { id },
  });
};

export const createSession = async (data: {
  sessionToken: string;
  userId: string;
  expires: Date;
}): Promise<void> => {
  await prisma.session.create({
    data,
  });
};

export const deleteSession = async (sessionToken: string): Promise<void> => {
  await prisma.session.delete({
    where: { sessionToken },
  });
};

export const createVerificationToken = async (data: {
  identifier: string;
  token: string;
  expires: Date;
}): Promise<void> => {
  await prisma.verificationToken.create({
    data,
  });
};

export const findVerificationToken = async (token: string): Promise<{ identifier: string; token: string; expires: Date; } | null> => {
  return prisma.verificationToken.findFirst({
    where: { token },
  });
};

export const deleteVerificationToken = async (token: string): Promise<void> => {
  await prisma.verificationToken.delete({
    where: { token },
  });
};
