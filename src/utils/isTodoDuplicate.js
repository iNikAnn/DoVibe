// utils
import highlightDuplicate from '../utils/highlightDuplicate';

function isTodoDuplicate(array, input, id) {
	if (!array) return;

	const duplicate = array.find((todo) => (todo.title === input) && (todo.id !== id));

	if (duplicate) {
		highlightDuplicate(duplicate);

		return true;
	};

	return false;
}

export default isTodoDuplicate;