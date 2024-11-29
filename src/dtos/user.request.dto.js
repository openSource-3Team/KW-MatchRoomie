export function userRequest(user) {
	return {
		id: user.id,
		email: user.email,
		name: user.name,
		dormitory: user.dormitory,
		department: user.department,
		gender: user.gender,
		studentId: user.studentId,
		birth: user.birth,
		phoneNumber: user.phoneNumber,
		isSmoking: user.isSmoking,
		imageUrl: user.imageUrl,
		wakeUpTime: user.wakeUpTime,
		acLevel: user.acLevel,
	};
}
