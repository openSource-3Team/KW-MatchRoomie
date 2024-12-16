import { prisma } from "../../config/db.config.js";

export const messageService = {
	create: async ({ senderId, receiverId, content }) => {
		return await prisma.message.create({
			data: { senderId, receiverId, content },
		});
	},

	getSentMessages: async (userId) => {
		return await prisma.message.findMany({
			where: { senderId: userId },
			include: {
				receiver: {
					select: { id: true, name: true },
				},
			},
			orderBy: { createdAt: "desc" },
		});
	},

	getReceivedMessages: async (userId) => {
		return await prisma.message.findMany({
			where: { receiverId: userId },
			include: {
				sender: {
					select: { id: true, name: true },
				},
			},
			orderBy: { createdAt: "desc" },
		});
	},
};
