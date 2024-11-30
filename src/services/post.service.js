import { postRepository } from "../repository/post.repository.js";

export const postService = {
	createPost: async (title, content, authorId) => {
		return await postRepository.createPost({ title, content, authorId });
	},

	getAllPosts: async () => {
		return await postRepository.findAllPosts();
	},

	getPostById: async (id) => {
		const post = await postRepository.findPostById(id);
		if (!post) throw new Error("Post not found");
		return post;
	},

	updatePost: async (id, title, content) => {
		return await postRepository.updatePost(id, { title, content });
	},

	deletePost: async (id) => {
		await postRepository.deletePost(id);
		return { success: true };
	},
};
