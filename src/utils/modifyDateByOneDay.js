function modifyDateByOneDay(date, key) {
	// Sets CSS variable for viewtransition API
	document.documentElement.style.setProperty(
		'--animDir', (key === 'ArrowRight' ? '-50%' : '50%')
	);

	if (!date) {
		return new Date().toISOString().slice(0, 10);
	};

	const currDate = new Date(date);
	currDate.setDate(currDate.getDate() + (key === 'ArrowRight' ? 1 : -1));

	return currDate.toISOString().slice(0, 10);
}

export default modifyDateByOneDay;