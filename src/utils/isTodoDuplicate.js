// utils
import highlightDuplicate from '../utils/highlightDuplicate';

function isTodoDuplicate(array, input) {
	if (!array) return;

	const duplicate = array.find((todo) => todo.title === input);

	if (duplicate) {
		highlightDuplicate(duplicate);

		return true;
	};

	return false;
}

export default isTodoDuplicate;