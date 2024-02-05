// utils
import highlightDuplicate from '../utils/highlightDuplicate';

function isTodoDuplicate(array, input) {
	const duplicate = array.find((todo) => todo.title === input);

	if (duplicate) {
		highlightDuplicate(duplicate);

		return true;
	};

	return false;
}

export default isTodoDuplicate;