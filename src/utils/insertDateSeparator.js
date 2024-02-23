function insertDateSeparator(array) {
	const outArr = [];
	let currentDate = '';

	for (const obj of array) {
		const objDate = obj.bin;

		if (currentDate !== objDate) {
			outArr.push({ type: 'dateSeparator', bin: objDate, id: objDate });
			currentDate = objDate;
		};

		outArr.push(obj);
	};

	return outArr;
}

export default insertDateSeparator;