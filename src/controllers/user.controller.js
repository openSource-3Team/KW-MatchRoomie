import { userService } from "../services/user.service.js";
import { response } from "../../config/response.js";

export const userController = {
	register: async (req, res) => {
		try {
			const { email, password } = req.body;
			const result = await userService.registerUser(email, password);
			res.status(201).send(response(201, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const result = await userService.loginUser(email, password);
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(401).send(response(401, { error: err.message }));
		}
	},

	resetPassword: async (req, res) => {
		try {
			const { email, newPassword } = req.body;
			const result = await userService.resetPassword(email, newPassword);
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	updateProfile: async (req, res) => {
		try {
			const { id } = req.params;
			const profileData = req.body;
			const result = await userService.updateProfile(Number(id), profileData);
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	getUserById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await userService.getUserById(Number(id));
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(404).send(response(404, { error: err.message }));
		}
	},

	filterUsers: async (req, res) => {
		try {
			const filters = req.query;
			const result = await userService.filterUsers(filters);
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	sendMessage: async (req, res) => {
		try {
			const { senderId, receiverId, content } = req.body;
			const result = await userService.sendMessage(senderId, receiverId, content);
			res.status(201).send(response(201, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	getSentMessages: async (req, res) => {
		try {
			const { userId } = req.params;
			const result = await userService.getSentMessages(Number(userId));
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	getReceivedMessages: async (req, res) => {
		try {
			const { userId } = req.params;
			const result = await userService.getReceivedMessages(Number(userId));
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},
};
