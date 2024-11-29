import { userService } from "../services/user.service.js";

export const userController = {
	register: async (req, res) => {
		const { email, password } = req.body;

		try {
			const result = await userService.registerUser(email, password);
			res.status(201).json(result);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},
};
