// import { sleepingHabitService } from "../services/sleepingHabbit.service.js";

// export const sleepingHabitController = {
// 	addHabit: async (req, res) => {
// 		try {
// 			const newHabit = await sleepingHabitService.addHabit({
// 				...req.body,
// 				userId: Number(req.params.userId),
// 			});
// 			res.status(201).json(newHabit);
// 		} catch (err) {
// 			res.status(400).json({ error: err.message });
// 		}
// 	},
// };
