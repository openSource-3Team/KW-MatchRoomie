import { prisma } from "../../config/db.config.js";

export const commentRepository = {
	// 댓글 생성
	createComment: async (data) => {
		return await prisma.comment.create({ data });
	},

	// 특정 게시글의 댓글 조회
	findCommentsByPostId: async (postId) => {
		return await prisma.comment.findMany({
			where: { postId },
			include: {
				author: { select: { id: true, name: true } },
			},
			orderBy: { createdAt: "desc" },
		});
	},

	// 댓글 수정
	updateComment: async (id, content) => {
		return await prisma.comment.update({
			where: { id },
			data: { content },
		});
	},

	// 댓글 삭제
	deleteComment: async (id) => {
		return await prisma.comment.delete({
			where: { id },
		});
	},
};
