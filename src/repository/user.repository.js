import { prisma } from "../../config/db.config.js";

export const userRepository = {
	createUser: (data) => {
		// 선택적 필드에 null을 설정하거나 아예 삭제
		const userData = {
			...data,
		};

		return prisma.user.create({
			data: userData,
		});
	},
	findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
	updatePassword: (id, newPassword) =>
		prisma.user.update({ where: { id }, data: { password: newPassword } }),
	updateProfile: (id, data) => prisma.user.update({ where: { id }, data }),
	findById: (id) =>
		prisma.user.findUnique({
			where: { id },
			include: { sleepingHabits: true }, // 잠버릇 포함
		}),

	filterUsers: async (filters) => {
		return await prisma.user.findMany({
			where: filters,
			include: {
				gamePreferences: true,
				studyPreferences: true,
				foodPreferences: true,
				sleepingHabits: true,
			},
		});
	},
};
