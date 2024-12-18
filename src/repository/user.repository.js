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
	updateProfile: (id, data) => prisma.user.update({ where: { id }, data }),
	findById: (id) =>
		prisma.user.findUnique({
			where: { id },
			include: {
				gamePreferences: true, // 게임 선호 추가
				studyPreferences: true, // 공부 선호 추가
				foodPreferences: true, // 음식 선호 추가
				sleepingHabits: true, // 잠버릇 추가
			},
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

	// 인증 코드 저장
	saveVerificationCode: async (email, code) => {
		return await prisma.user.update({
			where: { email },
			data: { resetToken: code },
		});
	},

	// 인증 코드 검증
	validateVerificationCode: async (email, code) => {
		return await prisma.user.findFirst({
			where: { email, resetToken: code },
		});
	},

	// 비밀번호 업데이트 및 인증 코드 삭제
	updatePassword: async (email, newPassword) => {
		return await prisma.user.update({
			where: { email },
			data: { password: newPassword, resetToken: null },
		});
	},
};
