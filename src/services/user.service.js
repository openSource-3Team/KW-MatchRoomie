import { userRepository } from "../repository/user.repository.js";
import { messageRepository } from "../repository/message.repository.js";

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
			birth: profileData.birth ? new Date(profileData.birth) : null,
			dormitory: profileData.dormitory || null,
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
			gamePreference: profileData.gamePreference || null,
			studyPreference: profileData.studyPreference || null,
			foodPreference: profileData.foodPreference || null,
			acLevel: profileData.acLevel || null,
			selectedFilters: profileData.selectedFilters
				? JSON.stringify(profileData.selectedFilters)
				: null,
		};

		// userRepository에 데이터 전달
		const updatedUser = await userRepository.updateProfile(id, dataToUpdate);

		// 반환할 데이터 구성
		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			imageUrl: updatedUser.imageUrl,
			gender: updatedUser.gender,
			birth: updatedUser.birth,
			dormitory: updatedUser.dormitory,
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
			gamePreference: updatedUser.gamePreference,
			studyPreference: updatedUser.studyPreference,
			foodPreference: updatedUser.foodPreference,
			acLevel: updatedUser.acLevel,
			selectedFilters: updatedUser.selectedFilters ? JSON.parse(updatedUser.selectedFilters) : [],
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
		const {
			dormitoryDuration,
			department,
			studentId,
			wakeUpTime,
			sleepingTime,
			lightOutTime,
			showerTime,
			isSmoking,
			cleaningFrequency,
			itemSharingPreference,
			gamePreference,
			studyPreference,
			foodPreference,
			lifestyle,
			sleepingHabits,
			acLevel,
			mbti,
		} = filterData;

		// Prisma 필터 조건 생성
		const filters = {};

		if (dormitoryDuration) filters.dormitoryDuration = { in: dormitoryDuration };
		if (department) filters.department = { in: department };
		if (studentId) filters.studentId = { in: studentId };
		if (wakeUpTime) filters.wakeUpTime = { in: wakeUpTime };
		if (sleepingTime) filters.sleepingTime = { in: sleepingTime };
		if (lightOutTime) filters.lightOutTime = { in: lightOutTime };
		if (showerTime) filters.showerTime = { in: showerTime };
		if (isSmoking !== undefined) filters.isSmoking = { in: isSmoking };
		if (cleaningFrequency) filters.cleaningFrequency = { in: cleaningFrequency };
		if (itemSharingPreference) filters.itemSharingPreference = { in: itemSharingPreference };
		if (gamePreference) filters.gamePreference = { in: gamePreference };
		if (studyPreference) filters.studyPreference = { in: studyPreference };
		if (foodPreference) filters.foodPreference = { in: foodPreference };
		if (lifestyle) filters.lifestyle = { in: lifestyle };
		if (sleepingHabits) filters.sleepingHabits = { some: { name: { in: sleepingHabits } } };
		if (acLevel) filters.acLevel = { in: acLevel };
		if (mbti) filters.mbti = { in: mbti };

		// Prisma를 사용하여 필터링된 사용자 검색
		const users = await userRepository.findMany({
			where: filters,
			select: {
				id: true,
				name: true,
				email: true,
				dormitory: true,
				dormitoryDuration: true,
				department: true,
				studentId: true,
				wakeUpTime: true,
				sleepingTime: true,
				lightOutTime: true,
				showerTime: true,
				isSmoking: true,
				cleaningFrequency: true,
				itemSharingPreference: true,
				gamePreference: true,
				studyPreference: true,
				foodPreference: true,
				lifestyle: true,
				sleepingHabits: true,
				acLevel: true,
				mbti: true,
				imageUrl: true,
			},
		});

		return users;
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
