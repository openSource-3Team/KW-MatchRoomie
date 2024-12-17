import { prisma } from "../../config/db.config.js";

export const userRepository = {
	createUser: (data) => {
		// 선택적 필드에 null을 설정하거나 아예 삭제
		const userData = {
			...data,
			birth: data.birth || "2000-01-01T00:00:00Z", // birth가 없으면 null로 처리
			isSmoking: data.isSmoking || null,
			imageUrl: data.imageUrl || null,
			wakeUpTime: data.wakeUpTime || "2000-01-01T00:00:00Z",
			sleepingTime: data.sleepingTime || "2000-01-01T00:00:00Z",
			lightOutTime: data.lightOutTime || "2000-01-01T00:00:00Z",
			showerTime: data.showerTime || "2000-01-01T00:00:00Z",
			acLevel: data.acLevel || null,
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
