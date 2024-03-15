import sortTodosByCompletion from '../utils/sortTodosByCompletion';

function initDatabse(setState) {
	if ('indexedDB' in window) {
		const request = indexedDB.open('todosDB');

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			const todosStore = db.createObjectStore('todosStore', { keyPath: 'id' });

			todosStore.createIndex('year', 'year', { unique: false });
			todosStore.createIndex('month', 'month', { unique: false });
			todosStore.createIndex('day', 'day', { unique: false });
			todosStore.createIndex('hours', 'hours', { unique: false });
			todosStore.createIndex('minutes', 'minutes', { unique: false });

			todosStore.createIndex('hasReminder', 'hasReminder', { unique: false });
		};

		request.onsuccess = (event) => {
			const db = event.target.result;

			const requestData = db
				.transaction('todosStore', 'readonly')
				.objectStore('todosStore')
				.getAll();

			requestData.onsuccess = (event) => {
				const todosArray = event.target.result;

				const todosObject = todosArray.reduce((acc, curr) => {
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