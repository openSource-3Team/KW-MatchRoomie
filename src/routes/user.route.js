import express from "express";
import { userController } from "../controllers/user.controller.js";
import multer from "multer";

const upload = multer();
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
 *       200:
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
 *     description: 로그인 id 반환.
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
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
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
 *         multipart/form-data:  # 이미지 업로드를 위해 multipart/form-data 사용
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               imageData:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 파일 (바이너리)
 *               gender:
 *                 type: string
 *                 example: 남성
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: 1995-08-15
 *               dormitory:
 *                 type: string
 *                 example: A-Block
 *               phoneNumber:
 *                 type: string
 *                 example: 010-1234-5678
 *               alarm:
 *                 type: string
 *                 example: 민감
 *               dormitoryDuration:
 *                 type: string
 *                 example: 6개월
 *               department:
 *                 type: string
 *                 example: Computer Science
 *               studentId:
 *                 type: string
 *                 example: 21학번
 *               lifestyle:
 *                 type: string
 *                 example: 아침형
 *               isSmoking:
 *                 type: boolean
 *                 example: false
 *               wakeUpTime:
 *                 type: string
 *                 example: 07:00
 *               sleepingTime:
 *                 type: string
 *                 example: 22:00
 *               lightOutTime:
 *                 type: string
 *                 example: 23:00
 *               showerTime:
 *                 type: string
 *                 example: 외출 전
 *               cleaningFrequency:
 *                 type: string
 *                 example: 매일
 *               itemSharingPreference:
 *                 type: string
 *                 example: 공유해요
 *               gamePreferences:  # 다대다 관계에 맞게 수정
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["PC 게임해요", "모바일 게임해요"]
 *               studyPreferences:  # 다대다 관계에 맞게 수정
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["불 켜고 해요", "스탠드 키고 해요"]
 *               foodPreferences:  # 다대다 관계에 맞게 수정
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["간단한 간식", "식사"]
 *               sleepingHabits:  # 다대다 관계에 맞게 수정
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["코골이", "잠꼬대"]
 *               acLevel:
 *                 type: string
 *                 example: 둔감
 *               selectedFilters:
 *                 type: object
 *                 additionalProperties: true
 *                 example: { "preferences": ["청소 주기", "공유해요"] }
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
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 imageData:
 *                   type: string
 *                   format: binary
 *                   description: 프로필 이미지 데이터
 *                 gamePreferences:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["PC 게임해요", "모바일 게임해요"]
 *                 studyPreferences:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["불 켜고 해요"]
 *                 foodPreferences:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["간단한 간식"]
 *                 sleepingHabits:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["코골이"]
 *       400:
 *         description: 잘못된 요청
 */
router.put("/:id/profile", upload.single("image"), userController.updateProfile);

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
 *                 imageData:
 *                   type: string
 *                   format: binary
 *                   description: "프로필 이미지 파일 (바이너리 데이터)"
 *       404:
 *         description: 사용자 ID를 찾을 수 없음
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /users/filter:
 *   post:
 *     summary: 사용자 필터링 조회
 *     description: 필터 조건에 맞는 사용자 목록을 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dormitoryDuration:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["6개월", "12개월"]
 *               department:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["컴퓨터공학과", "기계공학과"]
 *               studentId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["21학번", "22학번"]
 *               wakeUpTime:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["07:00", "08:00"]
 *               sleepingTime:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["22:00", "23:00"]
 *               isSmoking:
 *                 type: array
 *                 items:
 *                   type: boolean
 *                 example: [false]
 *               cleaningFrequency:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["매일", "주 1회"]
 *               gamePreference:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["PC 게임", "모바일 게임"]
 *               lifestyle:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["아침형", "저녁형"]
 *               sleepingHabits:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["코골이", "잠꼬대"]
 *               acLevel:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["민감", "보통"]
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
 *                   department:
 *                     type: string
 *                     example: Computer Science
 *                   studentId:
 *                     type: string
 *                     example: 21학번
 *                   wakeUpTime:
 *                     type: string
 *                     example: 07:00
 *                   sleepingTime:
 *                     type: string
 *                     example: 22:00
 *                   isSmoking:
 *                     type: boolean
 *                     example: false
 *                   acLevel:
 *                     type: string
 *                     example: 민감
 *       400:
 *         description: 잘못된 요청
 */
router.post("/filter", userController.filterUsers);
/**
 * @swagger
 * /users/send:
 *   post:
 *     summary: 쪽지 전송
 *     description: 사용자 간 쪽지를 전송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderId:
 *                 type: integer
 *               receiverId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 전송 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post("/send", userController.sendMessage);

/**
 * @swagger
 * /users/received/{userId}:
 *   get:
 *     summary: 수신 쪽지 조회
 *     description: 사용자가 받은은 쪽지를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       400:
 *         description: 잘못된 요청
 */
router.get("/received/:userId", userController.getReceivedMessages);

/**
 * @swagger
 * /users/sent/{userId}:
 *   get:
 *     summary: 발신 쪽지 조회
 *     description: 사용자가 보낸 쪽지를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       400:
 *         description: 잘못된 요청
 */
router.get("/sent/:userId", userController.getSentMessages);

export const userRouter = router;
