import SwaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "KW_MatchRoomie API",
			version: "0.0.1",
			description: "KW_MatchRoomie API with express, API 설명",
		},
		servers: [
	      {
		url: "http://15.165.223.198:3000", // EC2 퍼블릭 IP와 포트
	      },
	    ],
	},
	apis: ["./src/routes/*.js", "./swagger/*"],
};

export const specs = SwaggerJsdoc(options);
