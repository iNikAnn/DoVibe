/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
	// Return false to exempt requests from being fulfilled by index.html.
	({ request, url }) => {
		// If this isn't a navigation, skip.
		if (request.mode !== 'navigate') {
			return false;
		} // If this is a URL that starts with /_, skip.

		if (url.pathname.startsWith('/_')) {
			return false;
		} // If this looks like a URL for a resource, because it contains // a file extension, skip.

		if (url.pathname.match(fileExtensionRegexp)) {
			return false;
		} // Return true to signal that we want to use the handler.

		return true;
	},
	createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
	// Add in any other file extensions or routing criteria as needed.
	({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
	new StaleWhileRevalidate({
		cacheName: 'images',
		plugins: [
			// Ensure that once this runtime cache reaches a maximum size the
			// least-recently used images are removed.
			new ExpirationPlugin({ maxEntries: 50 }),
		],
	})
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// Any other custom service worker logic can go here.
setInterval(() => {
	checkReminders();
}, 30000);

const checkReminders = () => {
	console.log('check reminders');
	const request = self.indexedDB.open('todosDB');

	request.onsuccess = (event) => {
		console.log('database opened successfully');
		const db = event.target.result;

		let todosStore;

		try {
			todosStore = db
				.transaction('todosStore', 'readwrite')
				.objectStore('todosStore');
		} catch (error) {
			console.log('Error accessing todosStore:', error);
		};

		let notificationStatusMessage = "No reminders found to send";

		todosStore.openCursor().onsuccess = (event) => {
			const cursor = event.target.result;
			if (!cursor) return;

			if (cursor?.value.reminders.length > 0) {
				const todo = cursor.value;
				const { bin, id, title } = todo;

				for (const reminder of todo.reminders) {
					const { name: reminderName, year, month, day, hours, minutes } = reminder;

					const now = new Date();
					const todoDateTime = new Date(year, month, day, hours, minutes);
					const isMatched = now >= todoDateTime;

					if (isMatched) {
						createNotification(title);

						self.clients.matchAll()
							.then((clients) => {
								clients.forEach(client => {
									client.postMessage({
										action: 'removeReminder',
										bin,
										id,
										reminderName
									});
								});
							})
							.catch((error) => {
								console.log('Error while sending message to clients:', error);
							});

						notificationStatusMessage = 'Reminders have been sent successfully';
					};
				};
			};

			cursor.continue();
		};

		console.log(notificationStatusMessage);

		todosStore.openCursor().onerror = (event) => {
			console.log('An error occurred while opening the cursor on the store');
		};
	};

	request.onerror = (event) => {
		console.log('Database error: ' + event.target.errorCode);
	};
};

const createNotification = (title) => {
	console.log('Notification created:', title);
	self.registration.showNotification('DoVibe', { body: title });
};