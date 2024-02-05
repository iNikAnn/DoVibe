function isTodoDuplicate(array, input) {
	return array.find((todo) => todo.title === input);
}

export default isTodoDuplicate;