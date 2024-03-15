function updateDatabase(todosObj) {
	if ('indexedDB' in window) {
		const request = window.indexedDB.open('todosDB');

		request.onsuccess = (event) => {
			const db = event.target.result;

			const todosStore = db
				.transaction('todosStore', 'readwrite')
				.objectStore('todosStore');

			todosStore.clear();

			for (const todo of Object.values(todosObj).flat()) {
				todosStore.add(todo);
			};
		};
	} else {
		window.alert('Your browser does not support IndexedDB.');
	};
}

export default updateDatabase;