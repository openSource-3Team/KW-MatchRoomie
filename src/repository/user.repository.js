import { prisma } from "../config/prismaClient.js";

export const userRepository = {
	createUser: (data) => prisma.user.create({ data }),
	findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
	updatePassword: (id, newPassword) =>
		prisma.user.update({ where: { id }, data: { password: newPassword } }),
	updateProfile: (id, profileData) => prisma.user.update({ where: { id }, data: profileData }),
};
