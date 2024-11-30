import { userRepository } from "../repository/user.repository.js";

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
		const updatedUser = await userRepository.updateProfile(id, profileData);
		return {
			id: updatedUser.id,
			email: updatedUser.email,
			name: updatedUser.name,
			dormitory: updatedUser.dormitory,
			department: updatedUser.department,
			phoneNumber: updatedUser.phoneNumber,
			imageUrl: updatedUser.imageUrl,
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

	filterUsers: async (filters) => {
		const users = await userRepository.filterUsers(filters);
		return users.map((user) => ({
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
		}));
	},
};
