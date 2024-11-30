import swaggerAutogen from "swagger-autogen";

const swaggerAutogenInstance = swaggerAutogen();

const doc = {
	info: {
		title: "KW_MatchRoomie API",
		version: "0.0.1",
		description: "KW_MatchRoomie API with express, API 설명",
	},
	host: "15.165.223.198:3000", // 배포된 서버의 호스트와 포트
	schemes: ["http"], // https를 사용하는 경우 ["https"]로 변경
	basePath: "/",
	servers: [
		{
			url: "http://15.165.223.198:3000", // EC2 퍼블릭 IP와 포트
		},
	],
};

const outputFile = "./swagger-output.json"; // Swagger 문서가 생성될 위치
const endpointsFiles = ["./src/routes/user.route.js"]; // 라우트 파일 경로를 지정

swaggerAutogenInstance(outputFile, endpointsFiles);
