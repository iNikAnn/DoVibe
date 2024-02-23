function isIdDuplicate(array) {
	const idCountMap = {};

	for (const item of array) {
		idCountMap[item.id] = (idCountMap[item.id] || 0) + 1;
	};

	return Object.values(idCountMap).some((count) => count > 1);
}

export default isIdDuplicate;