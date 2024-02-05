function sortTodosByCompletion(array) {
	return array.sort((a, b) => {
		if (a.isCompleted && !b.isCompleted) {
			return 1;
		} else if (!a.isCompleted && b.isCompleted) {
			return -1;
		} else {
			return 0;
		};
	});
}

export default sortTodosByCompletion;