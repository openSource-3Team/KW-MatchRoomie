import { prisma } from "../../config/db.config.js";

export const userRepository = {
	createUser: (data) => prisma.user.create({ data }),
	findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
	updatePassword: (id, newPassword) =>
		prisma.user.update({ where: { id }, data: { password: newPassword } }),
	updateProfile: (id, profileData) => prisma.user.update({ where: { id }, data: profileData }),
	findById: (id) =>
		prisma.user.findUnique({
			where: { id },
			include: { sleepingHabits: true }, // 잠버릇 포함
		}),

	filterUsers: async (filters) => {
		const {
			dormitory,
			department,
			studentId,
			wakeUpTime,
			isSmoking,
			sleepingHabits,
			gender,
			lifestyle,
		} = filters;

		// Prisma에서 조건을 동적으로 처리
		const users = await prisma.user.findMany({
			where: {
				dormitory: dormitory || undefined, // 기숙사 기간
				department: department || undefined, // 학과
				studentId: studentId || undefined, // 학번
				gender: gender || undefined, // 성별
				lifestyle: lifestyle || undefined, // 생활 습관
				wakeUpTime: wakeUpTime ? { equals: new Date(wakeUpTime) } : undefined, // 기상 시간
				isSmoking: isSmoking !== undefined ? Boolean(isSmoking) : undefined, // 흡연 여부
				sleepingHabits: sleepingHabits
					? {
							some: {
								habit: { in: sleepingHabits }, // 잠버릇
							},
					  }
					: undefined,
			},
			include: {
				sleepingHabits: true, // 잠버릇 포함
			},
		});

		return users;
	},
};
