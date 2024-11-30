import { postService } from "../services/post.service.js";

export const postController = {
	createPost: async (req, res) => {
		try {
			const { title, content, authorId } = req.body;
			const result = await postService.createPost(title, content, authorId);
			res.status(201).json(result);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},

	getAllPosts: async (req, res) => {
		try {
			const posts = await postService.getAllPosts();
			res.status(200).json(posts);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	getPostById: async (req, res) => {
		try {
			const post = await postService.getPostById(Number(req.params.id));
			res.status(200).json(post);
		} catch (err) {
			res.status(404).json({ error: err.message });
		}
	},

	updatePost: async (req, res) => {
		try {
			const { title, content } = req.body;
			const result = await postService.updatePost(Number(req.params.id), title, content);
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},

	deletePost: async (req, res) => {
		try {
			const result = await postService.deletePost(Number(req.params.id));
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},
};
