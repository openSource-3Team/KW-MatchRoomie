import { userRepository } from "../repositories/user.repository.js";
import { userDTO } from "../dtos/user.dto.js";

export const userService = {
	registerUser: async (email, password) => {
		const existingUser = await userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error("Email already exists");
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
};
