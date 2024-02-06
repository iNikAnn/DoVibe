function modifyDateByOneDay(date, key) {
	const currDate = new Date(date);
	currDate.setDate(currDate.getDate() + (key === 'ArrowRight' ? 1 : -1));

	return currDate.toISOString().slice(0, 10);
}

export default modifyDateByOneDay;