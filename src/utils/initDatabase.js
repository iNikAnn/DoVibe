import sortTodosByCompletion from '../utils/sortTodosByCompletion';

function initDatabse(setState) {
	if ('indexedDB' in window) {
		const request = indexedDB.open('todosDB');

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			const todosStore = db.createObjectStore('todosStore', { keyPath: 'id' });

			['year', 'month', 'day', 'hours', 'minutes', 'hasReminder'].forEach((item) => {
				todosStore.createIndex(item, item, { unique: false });
			});

			// move todos from local storage
			if (localStorage.getItem('todos')) {
				const todosObject = JSON.parse(localStorage.getItem('todos'));

				for (const todo of Object.values(todosObject).flat()) {
					todosStore.add(todo);
				};

				localStorage.removeItem('todos');
			};
		};

		request.onsuccess = (event) => {
			const db = event.target.result;

			const requestData = db
				.transaction('todosStore', 'readonly')
				.objectStore('todosStore')
				.getAll();

			requestData.onsuccess = (event) => {
				const todosArray = event.target.result;

				const todosObject = todosArray
					.sort((a, b) => new Date(a.bin).getTime() - new Date(b.bin).getTime())
					.reduce((acc, curr) => {
						if (curr.bin in acc) {
							acc[curr.bin].push(curr);
						} else {
							acc[curr.bin] = [curr];
						};

						return acc;
					}, {});

				for (const key in todosObject) {
					sortTodosByCompletion(todosObject[key]);
				};

				setState(todosObject);
			};
		};

		request.onerror = (event) => {
			console.log('Database error: ' + event.target.errorCode);
		};
	}
	else {
		window.alert('Your browser does not support IndexedDB.');
	};
}

export default initDatabse;