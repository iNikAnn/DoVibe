function isTodoDraggable(array, index) {
	if (index >= 0 && index < array.length) {
		const prev = array[index - 1];
		const next = array[index + 1];

		if (
			array[index].type === 'dateSeparator' ||
			array[index].isCompleted ||
			(prev && prev.type === 'dateSeparator' && (!next || (next && next.type === 'dateSeparator')))
		) {
			return false;
		};
	};

	return true;
}

export default isTodoDraggable;