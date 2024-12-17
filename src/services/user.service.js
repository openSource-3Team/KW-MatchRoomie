import { userRepository } from "../repository/user.repository.js";
import { messageRepository } from "../repository/message.repository.js";
import { prisma } from "../../config/db.config.js";

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

	resetPassword: async (email, newPassword) => {
		const user = await userRepository.findByEmail(email);
		if (!user) {
			throw new Error("유저가 없습니다.");
		}

		await userRepository.updatePassword(user.id, newPassword);
		return { success: true, message: "성공적으로 변경되었습니다." };
	},

	updateProfile: async (id, profileData) => {
		const dataToUpdate = {
			name: profileData.name || null,
			email: profileData.email || null,
			imageData: profileData.imageData || null,
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
			acLevel: profileData.acLevel || null,
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
			acLevel: updatedUser.acLevel,
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
			dormitory: user.dormitory,
			department: user.department,
			gender: user.gender,
			studentId: user.studentId,
			wakeUpTime: user.wakeUpTime,
			sleepingTime: user.sleepingTime,
			lightOutTime: user.lightOutTime,
			showerTime: user.showerTime,
			isSmoking: user.isSmoking,
			imageUrl: user.imageUrl,
			sleepingHabits: user.sleepingHabits.map((habit) => habit.habit),
		};
	},

	filterUsers: async (filterData) => {
		const filters = {
			dormitoryDuration: filterData.dormitoryDuration?.length
				? { in: filterData.dormitoryDuration }
				: undefined,
			department: filterData.department?.length ? { in: filterData.department } : undefined,
			studentId: filterData.studentId?.length ? { in: filterData.studentId } : undefined,
			wakeUpTime: filterData.wakeUpTime?.length ? { in: filterData.wakeUpTime } : undefined,
			sleepingTime: filterData.sleepingTime?.length ? { in: filterData.sleepingTime } : undefined,
			lightOutTime: filterData.lightOutTime?.length ? { in: filterData.lightOutTime } : undefined,
			showerTime: filterData.showerTime?.length ? { in: filterData.showerTime } : undefined,
			isSmoking: filterData.isSmoking?.length ? { in: filterData.isSmoking } : undefined,
			cleaningFrequency: filterData.cleaningFrequency?.length
				? { in: filterData.cleaningFrequency }
				: undefined,
			itemSharingPreference: filterData.itemSharingPreference?.length
				? { in: filterData.itemSharingPreference }
				: undefined,
			lifestyle: filterData.lifestyle?.length ? { in: filterData.lifestyle } : undefined,
			acLevel: filterData.acLevel?.length ? { in: filterData.acLevel } : undefined,
			mbti: filterData.mbti?.length ? { in: filterData.mbti } : undefined,
			gamePreferences: filterData.gamePreference?.length
				? { some: { name: { in: filterData.gamePreference } } }
				: undefined,
			studyPreferences: filterData.studyPreference?.length
				? { some: { name: { in: filterData.studyPreference } } }
				: undefined,
			foodPreferences: filterData.foodPreference?.length
				? { some: { name: { in: filterData.foodPreference } } }
				: undefined,
			sleepingHabits: filterData.sleepingHabits?.length
				? { some: { name: { in: filterData.sleepingHabits } } }
				: undefined,
		};

		// Prisma에서 필터링된 사용자 조회
		const filteredUsers = await userRepository.filterUsers(filters);
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
