import express from "express";
import { tempRouter } from "./src/routes/temp.route";
import { response } from "./config/response";
import { status } from "./config/response.status";
import { BaseError } from "./config/error";

const app = express();
const port = 3000;

// router setting
app.use("/temp", tempRouter);

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
	console.log(`Example app listening on port ${port}`);
});
