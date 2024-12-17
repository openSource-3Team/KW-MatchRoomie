import { response } from "../../config/response.js";
import { commentService } from "../services/comment.service.js";

export const commentController = {
	// 댓글 생성
	createComment: async (req, res) => {
		try {
			const { postId, authorId, content } = req.body;
			const result = await commentService.createComment(postId, authorId, content);
			res.status(201).send(response(201, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	// 특정 게시글 댓글 조회
	getCommentsByPostId: async (req, res) => {
		try {
			const { postId } = req.params;
			const result = await commentService.getCommentsByPostId(Number(postId));
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	// 댓글 수정
	updateComment: async (req, res) => {
		try {
			const { id } = req.params;
			const { content } = req.body;
			const result = await commentService.updateComment(Number(id), content);
			res.status(200).send(response(200, result));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},

	// 댓글 삭제
	deleteComment: async (req, res) => {
		try {
			const { id } = req.params;
			await commentService.deleteComment(Number(id));
			res.status(200).send(response(200, { message: "Comment deleted successfully" }));
		} catch (err) {
			res.status(400).send(response(400, { error: err.message }));
		}
	},
};
