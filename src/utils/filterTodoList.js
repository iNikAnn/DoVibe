function filterTodoList(array, filters) {
	if (!array) return [];

	let filteredList = array.slice();

	filters.forEach(([filter, filterProperty]) => {
		if (filter) {
			filteredList = filteredList.filter((todo) => !todo[filterProperty]);
		};
	});

	// ensuring only days with uncomplete tasks are displayed
	filteredList = filteredList.filter((el, index, arr) => {
		const next = arr[index + 1];

		return !(el.type === 'dateSeparator' && (
			!next || (next && (next.type === 'dateSeparator' || next.isCompleted))
		));
	});

	return filteredList;
}

export default filterTodoList;