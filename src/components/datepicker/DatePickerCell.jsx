import styles from '../../css/DatePickerCell.module.css';

// react
import { useEffect, useState } from 'react';

function DatePickerCell({ todos, initialDate, text, year, month, day, onSelectDay, checkForUnfinishedTodosInDay }) {
	const dayDate = new Date(year, month, text);
	const [isSelected, setIsSelected] = useState(false);
	const [hasUncompletedTodos, setHasUncompletedTodos] = useState(false);
	const isToday = new Date().toDateString() === dayDate.toDateString();

	// сheck for uncompleted todos in the current day
	useEffect(() => {
		setHasUncompletedTodos(
			checkForUnfinishedTodosInDay(dayDate)
		);
	}, [todos]);

	// checks if the day is selected
	useEffect(() => {
		setIsSelected(() => {
			const currentDate = new Date(initialDate);
			const dayDate = new Date(year, month, text);

			return dayDate.toDateString() === currentDate.toDateString();
		});
	}, [day, initialDate]);

	return (
		<div
			className={`${styles.cell} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''} ${hasUncompletedTodos ? styles.highlight : ''}`}
			onClick={() => onSelectDay(dayDate)}
		>
			{text}
		</div>
	);
}

export default DatePickerCell;