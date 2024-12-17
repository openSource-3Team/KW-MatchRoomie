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

	requestPasswordReset: async (req, res) => {
		const { email } = req.body;
		try {
			const response = await userService.requestPasswordReset(email);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	verifyCodeAndResetPassword: async (req, res) => {
		const { email, code, newPassword } = req.body;
		try {
			const response = await userService.verifyCodeAndResetPassword(email, code, newPassword);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	updateProfile: async (req, res) => {
		try {
			const { id } = req.params;
			const profileData = {
				...req.body,
				imageData: req.file ? req.file.buffer : null,
				gamePreferences: req.body.gamePreferences ? req.body.gamePreferences.split(",") : [],
				studyPreferences: req.body.studyPreferences ? req.body.studyPreferences.split(",") : [],
				foodPreferences: req.body.foodPreferences ? req.body.foodPreferences.split(",") : [],
				sleepingHabits: req.body.sleepingHabits ? req.body.sleepingHabits.split(",") : [],
			};
			const file = req.file; // Multer로 업로드된 파일

			// 이미지 데이터를 파일의 버퍼 데이터로 전달
			if (file) {
				profileData.imageData = file.buffer;
			}

			// 서비스 함수 호출
			const result = await userService.updateProfile(Number(id), profileData);

			res.status(200).send(response(200, result));
		} catch (err) {
			console.error(err);
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
			const filterData = req.body; // 클라이언트에서 보낸 필터 데이터
			const users = await userService.filterUsers(filterData);

			return res.status(200).json(users);
		} catch (error) {
			console.error("Error filtering users:", error);
			return res.status(500).json({ error: "서버 오류가 발생했습니다." });
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
