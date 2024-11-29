import { tempResponseDTO } from "../dtos/temp.response.dto";
import { flagResponseDTO } from "../dtos/temp.response.dto";
export const getTempData = () => {
	return tempResponseDTO("This is TEST! >.0");
};

export function CheckFlag(flag) {
	if (flag == 1) throw new Error("Flag is 1!!");
	else {
		return flagResponseDTO(flag);
	}
}
