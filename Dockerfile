# 베이스 이미지를 설정 (Node.js LTS 버전 권장)
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 매니저 파일 복사 (패키지 설치를 위해)
COPY package*.json ./

# 의존성 설치
RUN npm install

# Prisma Client 생성
RUN npx prisma generate

# 애플리케이션 파일 복사
COPY . .

# 애플리케이션 실행 포트 설정
EXPOSE 3000

# 애플리케이션 실행 명령어
CMD ["npm", "run", "start"]
