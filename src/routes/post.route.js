import express from "express";
import { postController } from "../controllers/post.controller.js";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 새로운 게시물 생성
 *     description: 제목, 내용, 작성자 ID를 기반으로 새로운 게시물을 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 게시물 제목
 *               content:
 *                 type: string
 *                 example: 게시물 내용
 *               authorId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: 게시물 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: 게시물 제목
 *                 content:
 *                   type: string
 *                   example: 게시물 내용
 *                 authorId:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-12-01T12:00:00Z
 */
router.post("/", postController.createPost);
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시물 조회
 *     description: 데이터베이스에 저장된 모든 게시물을 반환합니다.
 *     responses:
 *       200:
 *         description: 게시물 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 게시물 제목
 *                   content:
 *                     type: string
 *                     example: 게시물 내용
 *                   authorId:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2023-12-01T12:00:00Z
 */
router.get("/", postController.getAllPosts);
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 특정 게시물 조회
 *     description: ID를 기반으로 특정 게시물을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 조회할 게시물의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 게시물 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: 게시물 제목
 *                 content:
 *                   type: string
 *                   example: 게시물 내용
 *                 authorId:
 *                   type: integer
 *                   example: 1
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-12-01T12:00:00Z
 *       404:
 *         description: 게시물을 찾을 수 없음
 */
router.get("/:id", postController.getPostById);
/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: 게시물 수정
 *     description: ID를 기반으로 제목과 내용을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 게시물의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 수정된 제목
 *               content:
 *                 type: string
 *                 example: 수정된 내용
 *     responses:
 *       200:
 *         description: 게시물 수정 성공
 *       404:
 *         description: 게시물을 찾을 수 없음
 */
router.put("/:id", postController.updatePost);
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: 게시물 삭제
 *     description: ID를 기반으로 게시물을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 게시물의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 게시물 삭제 성공
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               likes:
 *                 type: integer
 *                 example: 20
 *       404:
 *         description: 게시물을 찾을 수 없음
 */
router.delete("/:id", postController.deletePost);

/**
 * @swagger
 * /posts/{id}/like:
 *   patch:
 *     summary: 게시글 좋아요 증가
 *     description: 특정 게시글의 좋아요 수를 1 증가시킵니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 좋아요 수 증가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.patch("/:id/like", postController.increaseLikes);

/**
 * @swagger
 * /posts/{id}/dislike:
 *   patch:
 *     summary: 게시글 좋아요 감소
 *     description: 특정 게시글의 좋아요 수를 1 감소시킵니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 좋아요 수 증가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.patch("/:id/dislike", postController.decreaseLikes);

export const postRouter = router;
