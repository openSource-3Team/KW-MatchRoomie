import { prisma } from "../../config/db.config.js";

export const postRepository = {
	createPost: (data) => prisma.post.create({ data }),
	findAllPosts: () => prisma.post.findMany({ include: { author: true } }),
	findPostById: (id) => prisma.post.findUnique({ where: { id }, include: { author: true } }),
	updatePost: (id, data) => prisma.post.update({ where: { id }, data }),
	deletePost: (id) => prisma.post.delete({ where: { id } }),
};
