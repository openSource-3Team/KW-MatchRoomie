import { userRepository } from "../repositories/user.repository.js";
import { userDTO } from "../dtos/user.dto.js";

export const userService = {
	createUser: async (userData) => {
		const newUser = await userRepository.createUser(userData);
		return userDTO(newUser);
	},
};
