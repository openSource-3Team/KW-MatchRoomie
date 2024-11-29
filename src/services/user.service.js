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
};
