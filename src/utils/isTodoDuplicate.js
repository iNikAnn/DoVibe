// utils
import highlightDuplicate from '../utils/highlightDuplicate';

function isTodoDuplicate(array, input, id) {
	let isDuplicate = false;

	const duplicate = (array || []).find(
		(todo) => (todo.title === input) && (todo.id !== id)
	);

	if (duplicate) {
		highlightDuplicate(duplicate);
		isDuplicate = true;
	};

	return isDuplicate;
}

export default isTodoDuplicate;