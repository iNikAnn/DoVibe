function modifyDateByOneDay(date, key) {
	if (!date) {
		return new Date().toISOString().slice(0, 10);
	};

	const currDate = new Date(date);
	currDate.setDate(currDate.getDate() + (key === 'Period' ? 1 : -1));

	return currDate.toISOString().slice(0, 10);
}

export default modifyDateByOneDay;