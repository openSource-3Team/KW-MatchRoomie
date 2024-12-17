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

	increaseLikes: async (id) => {
		const post = await postRepository.findPostById(id);
		if (!post) throw new Error("Post not found");

		return await postRepository.updatePost(id, { likes: post.likes + 1 });
	},

	decreaseLikes: async (id) => {
		const post = await postRepository.findPostById(id);
		if (!post) throw new Error("Post not found");

		const newLikes = post.likes > 0 ? post.likes - 1 : 0; // 좋아요가 음수되지 않도록
		return await postRepository.updatePost(id, { likes: newLikes });
	},
};
