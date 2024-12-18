import { userRepository } from "../repository/user.repository.js";
import { messageRepository } from "../repository/message.repository.js";
import { prisma } from "../../config/db.config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "hig26827463@gmail.com", // Gmail 계정
		pass: "gssj ghci uuga qfcd", // 앱 비밀번호
	},
});

export const userService = {
	registerUser: async (email, password) => {
		const existingUser = await userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error("이미 존재하는 아이디 입니다.");
		}

		const newUser = await userRepository.createUser({
			email,
			password,
		});

		return { id: newUser.id, email: newUser.email };
	},

	loginUser: async (email, password) => {
		const user = await userRepository.findByEmail(email);
		if (!user || user.password !== password) {
			throw new Error("비밀번호가 일치하지 않습니다. ");
		}

		return { id: user.id, email: user.email };
	},

	requestPasswordReset: async (email) => {
		const user = await userRepository.findByEmail(email);
		if (!user) throw new Error("등록된 이메일이 아닙니다.");

		// 6자리 인증 코드 생성
		const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

		// 인증 코드 저장
		await userRepository.saveVerificationCode(email, verificationCode);

		// 이메일 전송
		await transporter.sendMail({
			from: '"Password Reset" hig26827463@gmail.com',
			to: email,
			subject: "비밀번호 재설정 인증 코드",
			text: `비밀번호 재설정 인증 코드: ${verificationCode}`,
		});

		return { message: "이메일로 인증 코드를 전송했습니다." };
	},

	// 인증 코드 검증 및 비밀번호 재설정
	verifyCodeAndResetPassword: async (email, code, newPassword) => {
		const user = await userRepository.validateVerificationCode(email, code);
		if (!user) throw new Error("유효하지 않은 인증 코드입니다.");

		// 비밀번호 업데이트
		await userRepository.updatePassword(email, newPassword);
		return { message: "비밀번호가 성공적으로 변경되었습니다." };
	},

	updateProfile: async (id, profileData) => {
		const dataToUpdate = {
			name: profileData.name || null,
			gender: profileData.gender || null,
			phoneNumber: profileData.phoneNumber || null,
			alarm: profileData.alarm || null,
			dormitoryDuration: profileData.dormitoryDuration || null,
			department: profileData.department || null,
			studentId: profileData.studentId || null,
			lifestyle: profileData.lifestyle || null,
			isSmoking: profileData.isSmoking !== undefined ? Boolean(profileData.isSmoking) : null,
			wakeUpTime: profileData.wakeUpTime || null,
			sleepingTime: profileData.sleepingTime || null,
			lightOutTime: profileData.lightOutTime || null,
			showerTime: profileData.showerTime || null,
			cleaningFrequency: profileData.cleaningFrequency || null,
			itemSharingPreference: profileData.itemSharingPreference || null,
			mbti: profileData.mbti || null,
			gamePreferences: Array.isArray(profileData.gamePreferences)
				? {
						connectOrCreate: profileData.gamePreferences.map((name) => ({
							where: { name },
							create: { name },
						})),
				  }
				: undefined,
			studyPreferences: Array.isArray(profileData.studyPreferences)
				? {
						connectOrCreate: profileData.studyPreferences.map((name) => ({
							where: { name },
							create: { name },
						})),
				  }
				: undefined,
			foodPreferences: Array.isArray(profileData.foodPreferences)
				? {
						connectOrCreate: profileData.foodPreferences.map((name) => ({
							where: { name },
							create: { name },
						})),
				  }
				: undefined,
			sleepingHabits: Array.isArray(profileData.sleepingHabits)
				? {
						connectOrCreate: profileData.sleepingHabits.map((name) => ({
							where: { name },
							create: { name },
						})),
				  }
				: undefined,
		};

		// Prisma 클라이언트를 사용하여 업데이트 수행
		const updatedUser = await prisma.user.update({
			where: { id: Number(id) },
			data: dataToUpdate,
			include: {
				gamePreferences: true,
				studyPreferences: true,
				foodPreferences: true,
				sleepingHabits: true,
			},
		});

		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			imageData: updatedUser.imageData,
			gender: updatedUser.gender,
			phoneNumber: updatedUser.phoneNumber,
			alarm: updatedUser.alarm,
			dormitoryDuration: updatedUser.dormitoryDuration,
			department: updatedUser.department,
			studentId: updatedUser.studentId,
			lifestyle: updatedUser.lifestyle,
			isSmoking: updatedUser.isSmoking,
			wakeUpTime: updatedUser.wakeUpTime,
			sleepingTime: updatedUser.sleepingTime,
			lightOutTime: updatedUser.lightOutTime,
			showerTime: updatedUser.showerTime,
			cleaningFrequency: updatedUser.cleaningFrequency,
			itemSharingPreference: updatedUser.itemSharingPreference,
			mbti: updatedUser.mbti,
			gamePreferences: updatedUser.gamePreferences.map((g) => g.name),
			studyPreferences: updatedUser.studyPreferences.map((s) => s.name),
			foodPreferences: updatedUser.foodPreferences.map((f) => f.name),
			sleepingHabits: updatedUser.sleepingHabits.map((h) => h.name),
		};
	},

	getUserById: async (id) => {
		const user = await userRepository.findById(id);
		if (!user) throw new Error("User not found");
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			studentId: user.studentId,
			department: user.department,
			dormitoryDuration: user.dormitoryDuration,
			gender: user.gender,
			studentId: user.studentId,
			wakeUpTime: user.wakeUpTime,
			sleepingTime: user.sleepingTime,
			lightOutTime: user.lightOutTime,
			showerTime: user.showerTime,
			isSmoking: user.isSmoking,
			lifestyle: user.lifestyle,
			alarm: user.alarm,
			itemSharingPreference: user.itemSharingPreference,
			gamePreference: Array.isArray(user.gamePreferences)
				? user.gamePreferences.map((game) => game.name)
				: [],
			studyPreference: Array.isArray(user.studyPreferences)
				? user.studyPreferences.map((study) => study.name)
				: [],
			foodPreference: Array.isArray(user.foodPreferences)
				? user.foodPreferences.map((food) => food.name)
				: [],
			sleepingHabits: Array.isArray(user.sleepingHabits)
				? user.sleepingHabits.map((habit) => habit.name)
				: [],
			cleaningFrequency: user.cleaningFrequency,
			mbti: user.mbti,
		};
	},

	filterUsers: async (filterData) => {
		const filters = [];

		// 문자열 컬럼 필터링 (예: dormitoryDuration, department, etc.)
		if (filterData.dormitoryDuration?.length) {
			filters.push({ dormitoryDuration: { in: filterData.dormitoryDuration } });
		}
		if (filterData.department?.length) {
			filters.push({ department: { in: filterData.department } });
		}
		if (filterData.studentId?.length) {
			filters.push({ studentId: { in: filterData.studentId } });
		}
		if (filterData.wakeUpTime?.length) {
			filters.push({ wakeUpTime: { in: filterData.wakeUpTime } });
		}
		if (filterData.sleepingTime?.length) {
			filters.push({ sleepingTime: { in: filterData.sleepingTime } });
		}
		if (filterData.lightOutTime?.length) {
			filters.push({ lightOutTime: { in: filterData.lightOutTime } });
		}
		if (filterData.showerTime?.length) {
			filters.push({ showerTime: { in: filterData.showerTime } });
		}
		if (filterData.isSmoking?.length) {
			filters.push({
				OR: filterData.isSmoking.map((value) => ({ isSmoking: value })),
			});
		}
		if (filterData.cleaningFrequency?.length) {
			filters.push({ cleaningFrequency: { in: filterData.cleaningFrequency } });
		}
		if (filterData.itemSharingPreference?.length) {
			filters.push({
				itemSharingPreference: { in: filterData.itemSharingPreference },
			});
		}
		if (filterData.lifestyle?.length) {
			filters.push({ lifestyle: { in: filterData.lifestyle } });
		}
		if (filterData.mbti?.length) {
			filters.push({ mbti: { in: filterData.mbti } });
		}

		// 관계 테이블 필터링 (예: gamePreferences, foodPreferences)
		if (filterData.foodPreference?.length) {
			filters.push({
				foodPreferences: {
					some: {
						OR: filterData.foodPreference.map((name) => ({ name })),
					},
				},
			});
		}
		if (filterData.gamePreference?.length) {
			filters.push({
				gamePreferences: {
					some: {
						OR: filterData.gamePreference.map((name) => ({ name })),
					},
				},
			});
		}
		if (filterData.studyPreference?.length) {
			filters.push({
				studyPreferences: {
					some: {
						OR: filterData.studyPreference.map((name) => ({ name })),
					},
				},
			});
		}
		if (filterData.sleepingHabits?.length) {
			filters.push({
				sleepingHabits: {
					some: {
						OR: filterData.sleepingHabits.map((name) => ({ name })),
					},
				},
			});
		}

		// Prisma 쿼리 실행
		const filteredUsers = await prisma.user.findMany({
			where: {
				AND: filters, // 모든 필터 조건을 만족
			},
			include: {
				foodPreferences: true,
				gamePreferences: true,
				studyPreferences: true,
				sleepingHabits: true,
			},
		});

		return filteredUsers;
	},

	sendMessage: async (senderId, receiverId, content) => {
		if (!senderId || !receiverId || !content) {
			throw new Error("Sender, receiver, and content are required");
		}

		return await messageRepository.create({ senderId, receiverId, content });
	},

	getSentMessages: async (userId) => {
		return await messageRepository.getSentMessages(userId);
	},

	getReceivedMessages: async (userId) => {
		return await messageRepository.getReceivedMessages(userId);
	},
};
