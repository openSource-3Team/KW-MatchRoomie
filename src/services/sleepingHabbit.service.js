import { sleepingHabitRepository } from "../repositories/sleepingHabit.repository.js";
import { sleepingHabitDTO } from "../dtos/sleepingHabit.dto.js";

export const sleepingHabitService = {
	addHabit: async (habitData) => {
		const newHabit = await sleepingHabitRepository.createHabit(habitData);
		return sleepingHabitDTO(newHabit);
	},
	getHabitsByUserId: async (userId) => {
		const habits = await sleepingHabitRepository.findHabitsByUserId(userId);
		return habits.map(sleepingHabitDTO);
	},
	deleteHabit: async (id) => {
		await sleepingHabitRepository.deleteHabit(id);
		return { success: true, id };
	},
};
