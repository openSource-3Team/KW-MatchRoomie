import { userService } from "../services/user.service.js";
import { response } from "../../config/response.js";
import { status } from "../config/status.js";

export const userController = {
	register: async (req, res) => {
		try {
			const { email, password } = req.body;
			const result = await userService.registerUser(email, password);
			res.status(status.SUCCESS.status).send(response(status.SUCCESS, result));
		} catch (err) {
			res
				.status(status.BAD_REQUEST.status)
				.send(response(status.BAD_REQUEST, { error: err.message }));
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const result = await userService.loginUser(email, password);
			res.status(status.SUCCESS.status).send(response(status.SUCCESS, result));
		} catch (err) {
			res
				.status(status.UNAUTHORIZED.status)
				.send(response(status.UNAUTHORIZED, { error: err.message }));
		}
	},

	resetPassword: async (req, res) => {
		try {
			const { email, newPassword } = req.body;
			const result = await userService.resetPassword(email, newPassword);
			res.status(status.SUCCESS.status).send(response(status.SUCCESS, result));
		} catch (err) {
			res
				.status(status.BAD_REQUEST.status)
				.send(response(status.BAD_REQUEST, { error: err.message }));
		}
	},

	updateProfile: async (req, res) => {
		try {
			const { id } = req.params;
			const profileData = req.body;
			const result = await userService.updateProfile(Number(id), profileData);
			res.status(status.SUCCESS.status).send(response(status.SUCCESS, result));
		} catch (err) {
			res
				.status(status.BAD_REQUEST.status)
				.send(response(status.BAD_REQUEST, { error: err.message }));
		}
	},

	getUserById: async (req, res) => {
		try {
			const { id } = req.params;
			const result = await userService.getUserById(Number(id));
			res.status(status.SUCCESS.status).send(response(status.SUCCESS, result));
		} catch (err) {
			res
				.status(status.MEMBER_NOT_FOUND.status)
				.send(response(status.MEMBER_NOT_FOUND, { error: err.message }));
		}
	},

	filterUsers: async (req, res) => {
		try {
			const filters = req.query;
			const result = await userService.filterUsers(filters);
			res.status(status.SUCCESS.status).send(response(status.SUCCESS, result));
		} catch (err) {
			res
				.status(status.BAD_REQUEST.status)
				.send(response(status.BAD_REQUEST, { error: err.message }));
		}
	},
};
