function updateReminders(todo, reminderName, enabling) {
	const isReminderExist = todo.reminders?.find((reminder) => reminder.name === reminderName);

	if (isReminderExist && enabling) {
		return { ...todo };
	};

	const { reminders } = todo;
	let updatedReminders = reminders || [];

	if (enabling) {
		updatedReminders.push({
			name: reminderName
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