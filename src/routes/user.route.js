import express from "express";
import { userController } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 사용자 등록
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: 사용자 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *       400:
 *         description: 잘못된 요청
 */
router.post("/register", userController.register);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 사용자 인증 후 토큰을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGci...
 *       401:
 *         description: 인증 실패
 */
router.post("/login", userController.login);
router.post("/reset-password", userController.resetPassword);
/**
 * @swagger
 * /users/{id}/profile:
 *   put:
 *     summary: 사용자 프로필 업데이트
 *     description: 사용자 ID를 기반으로 프로필 정보를 업데이트합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 업데이트할 사용자 ID
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
 *               name:
 *                 type: string
 *                 example: John Doe
 *               dormitory:
 *                 type: string
 *                 example: A-Block
 *               department:
 *                 type: string
 *                 example: Computer Science
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/profile.jpg
 *     responses:
 *       200:
 *         description: 프로필 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 dormitory:
 *                   type: string
 *                   example: A-Block
 *                 department:
 *                   type: string
 *                   example: Computer Science
 *                 phoneNumber:
 *                   type: string
 *                   example: 010-1234-5678
 *                 imageUrl:
 *                   type: string
 *                   example: https://example.com/profile.jpg
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 사용자 ID를 찾을 수 없음
 */
router.put("/:id/profile", userController.updateProfile);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 사용자 정보 조회
 *     description: 사용자 ID를 기반으로 사용자 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 조회할 사용자 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: 사용자 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 dormitory:
 *                   type: string
 *                   example: A-Block
 *                 department:
 *                   type: string
 *                   example: Computer Science
 *                 phoneNumber:
 *                   type: string
 *                   example: 010-1234-5678
 *                 imageUrl:
 *                   type: string
 *                   example: https://example.com/profile.jpg
 *       404:
 *         description: 사용자 ID를 찾을 수 없음
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /users/filter:
 *   post:
 *     summary: 사용자 필터링
 *     description: 필터 조건에 맞는 사용자 목록을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dormitoryDuration:
 *                 type: string
 *                 example: 6개월
 *               department:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "인공지능융합대학", "공과대학" ]
 *               studentId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "21학번", "22학번" ]
 *               isSmoking:
 *                 type: boolean
 *                 example: false
 *               cleaningFrequency:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "매일", "2~3일에 한 번" ]
 *               lifestyle:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "아침형" ]
 *               wakeUpTime:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "07:00", "08:00" ]
 *               sleepingTime:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "22:00", "23:00" ]
 *               lightOutTime:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "22:00", "23:00" ]
 *               showerTime:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "외출 전", "귀가 후" ]
 *               itemSharingPreference:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "공유해요", "공유하기 싫어요" ]
 *               gamePreference:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "PC 게임", "모바일 게임" ]
 *               studyPreference:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "스탠드 켜고 하면 가능해요", "불 켜고 해도 돼요" ]
 *               foodPreference:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "음료", "간단한 간식", "배달음식" ]
 *               mbti:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "INFJ", "ENFP" ]
 *     responses:
 *       200:
 *         description: 필터링 성공
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
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   dormitory:
 *                     type: string
 *                     example: A-Block
 *                   dormitoryDuration:
 *                     type: string
 *                     example: 6개월
 *                   department:
 *                     type: string
 *                     example: Computer Science
 *                   lifestyle:
 *                     type: string
 *                     example: 아침형
 *                   isSmoking:
 *                     type: boolean
 *                     example: false
 *                   wakeUpTime:
 *                     type: string
 *                     example: 07:00
 *                   sleepingTime:
 *                     type: string
 *                     example: 23:00
 *                   lightOutTime:
 *                     type: string
 *                     example: 22:00
 *                   showerTime:
 *                     type: string
 *                     example: 외출 전
 *                   itemSharingPreference:
 *                     type: string
 *                     example: 공유해요
 *                   gamePreference:
 *                     type: string
 *                     example: PC 게임
 *                   studyPreference:
 *                     type: string
 *                     example: 불 켜고 해도 돼요
 *                   foodPreference:
 *                     type: string
 *                     example: 배달음식
 *                   mbti:
 *                     type: string
 *                     example: INFJ
 *       400:
 *         description: 잘못된 요청
 */
router.post("/filter", userController.filterUsers);

export const userRouter = router;
