import express from "express";
import { tempRouter } from "./src/routes/temp.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { commentRouter } from "./src/routes/comment.route.js";
//import { sleepingHabitRouter } from "./src/routes/sleepingHabbit.route.js";
import { postRouter } from "./src/routes/post.route.js";
import { response } from "./config/response";
import { status } from "./config/response.status";
import { BaseError } from "./config/error";
import { specs } from "./config/swagger.config.js";
import cors from "cors";
import SwaggerUi from "swagger-ui-express";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//swagger
app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

// router setting
app.use("/temp", tempRouter);
app.use("comments", commentRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
//app.use("/habits", sleepingHabitRouter);

app.use((req, res, next) => {
	const err = new BaseError(status.BAD_REQUEST);
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
	res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
	console.log(`Server running at http: ${port}`);
});
