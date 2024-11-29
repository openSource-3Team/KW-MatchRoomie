import { prisma } from "../config/prismaClient.js";

export const userRepository = {
	createUser: (data) => prisma.user.create({ data }),
	findAllUsers: () => prisma.user.findMany({ include: { sleepingHabits: true } }),
	findUserById: (id) =>
		prisma.user.findUnique({ where: { id }, include: { sleepingHabits: true } }),
	updateUser: (id, data) => prisma.user.update({ where: { id }, data }),
	deleteUser: (id) => prisma.user.delete({ where: { id } }),
};
