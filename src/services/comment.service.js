import { commentRepository } from "../repository/comment.repository.js";

export const commentService = {
	// 댓글 생성
	createComment: async (postId, authorId, content) => {
		if (!postId || !authorId || !content) {
			throw new Error("postId, authorId, content는 필수 입력값입니다.");
		}
		return await commentRepository.createComment({ postId, authorId, content });
	},

	// 특정 게시글의 댓글 조회
	getCommentsByPostId: async (postId) => {
		return await commentRepository.findCommentsByPostId(postId);
	},

	// 댓글 수정
	updateComment: async (id, content) => {
		return await commentRepository.updateComment(id, content);
	},

	// 댓글 삭제
	deleteComment: async (id) => {
		return await commentRepository.deleteComment(id);
	},
};
