import { userService } from "../services/user.service.js";

export const userController = {
	createUser: async (req, res) => {
		try {
			const newUser = await userService.createUser(req.body);
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},
};
