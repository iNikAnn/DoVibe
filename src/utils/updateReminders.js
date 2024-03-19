function updateReminders(todo, reminderName, enabling) {
	const isReminderExist = todo.reminders?.find((reminder) => reminder.name === reminderName);

	if (isReminderExist && enabling) {
		return { ...todo };
	};

	const { reminders } = todo;
	let updatedReminders = reminders || [];

	if (enabling) {
		const todoDate = new Date(todo.bin);

		switch (reminderName) {
			case '1DayBefore':
				todoDate.setDate(todoDate.getDate() - 1);
				break;

			case '3DayBefore':
				todoDate.setDate(todoDate.getDate() - 3);
				break;

			default:
				break;
		};

		updatedReminders.push({
			name: reminderName,
			year: todoDate.getFullYear(),
			month: todoDate.getMonth(),
			day: todoDate.getDate(),
			hours: 8,
			minutes: 0
		});
	} else {
		updatedReminders = updatedReminders.filter((reminder) => reminder.name !== reminderName);
	};

	return {
		...todo,
		reminders: updatedReminders,
		hasReminder: updatedReminders.length > 0
	};
}

export default updateReminders;