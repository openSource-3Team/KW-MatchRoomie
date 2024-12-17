import express from "express";
import { commentController } from "../controllers/comment.controller.js";

const router = express.Router();

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: 댓글 생성
 *     description: 특정 게시글에 댓글을 작성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *               authorId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: 댓글 생성 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post("/", commentController.createComment);

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: 댓글 조회
 *     description: 특정 게시글의 댓글 목록을 반환합니다.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 조회 성공
 *       400:
 *         description: 잘못된 요청
 */
router.get("/:postId", commentController.getCommentsByPostId);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: 댓글 수정
 *     description: 댓글 내용을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *       400:
 *         description: 잘못된 요청
 */
router.put("/:id", commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 댓글을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *       400:
 *         description: 잘못된 요청
 */
router.delete("/:id", commentController.deleteComment);

export const commentRouter = router;
