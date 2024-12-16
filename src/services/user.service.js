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

		return { id: user.id, email: user.email, name: user.name };
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
		const updatedUser = await userRepository.update({
			where: { id },
			data: {
				name: profileData.name || null, // 사용자 이름
				email: profileData.email || null, // 이메일
				imageUrl: profileData.imageUrl || null, // 프로필 이미지 URL
				gender: profileData.gender || null, // 성별
				birth: profileData.birth || null, // 생년월일
				dormitory: profileData.dormitory || null, // 기숙사
				dormitoryDuration: profileData.dormitoryDuration || null, // 기숙사 생활 기간
				department: profileData.department || null, // 단과대
				studentId: profileData.studentId || null, // 학번
				lifestyle: profileData.lifestyle || null, // 생활 패턴
				isSmoking: profileData.isSmoking || null, // 흡연 여부
				wakeUpTime: profileData.wakeUpTime || null, // 기상시간
				sleepingTime: profileData.sleepingTime || null, // 취침시간
				lightOutTime: profileData.lightOutTime || null, // 소등시간
				showerTime: profileData.showerTime || null, // 샤워시간
				cleaningFrequency: profileData.cleaningFrequency || null, // 청소 주기
				itemSharingPreference: profileData.itemSharingPreference || null, // 물건 공유 여부
				gamePreference: profileData.gamePreference || null, // 방에서 게임
				studyPreference: profileData.studyPreference || null, // 방 안 공부
				foodPreference: profileData.foodPreference || null, // 방 안 음식물 섭취
				acLevel: profileData.acLevel || null, // 알람 민감도
				selectedFilters: profileData.selectedFilters
					? JSON.stringify(profileData.selectedFilters)
					: null, // JSON 형태의 선택 필터
			},
		});

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
