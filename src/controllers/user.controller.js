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

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const result = await userService.loginUser(email, password);
			res.status(200).json(result);
		} catch (err) {
			res.status(401).json({ error: err.message });
		}
	},

	resetPassword: async (req, res) => {
		try {
			const { email, newPassword } = req.body;
			const result = await userService.resetPassword(email, newPassword);
			res.status(200).json(result);
		} catch (err) {
			res.status(404).json({ error: err.message });
		}
	},

	updateProfile: async (req, res) => {
		try {
			const { id } = req.params;
			const profileData = req.body;
			const result = await userService.updateProfile(Number(id), profileData);
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},
};
