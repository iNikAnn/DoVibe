function highlightDuplicate(obj) {
	const el = document.querySelector(`div[data-id='${obj.id}']`);
	el.classList.add('highlightDuplicate');

	setTimeout(() => {
		el.classList.remove('highlightDuplicate');
	}, 1000);
}

export default highlightDuplicate;