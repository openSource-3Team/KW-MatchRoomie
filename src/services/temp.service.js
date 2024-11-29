import { tempResponseDTO } from "../dtos/temp.response.dto";

export const getTempData = () => {
	return tempResponseDTO("This is TEST! >.0");
};
