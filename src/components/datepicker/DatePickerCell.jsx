import styles from '../../css/DatePickerCell.module.css';

// react
import { useEffect, useState } from 'react';

function DatePickerCell({ initialDate, text, className, year, month, day, onClick }) {
	const [isSelected, setIsSelected] = useState(false);

	const [isToday, setIsToday] = useState(() => {
		const now = new Date();
		const currentDate = new Date(year, month, text);
		return now.toDateString() === currentDate.toDateString();
	});

	const [hasUncompletedTodos, setHasUncompletedTodos] = useState(() => {

	});

	useEffect(() => {
		setIsSelected(() => {
			if (className === 'weekDay') return false;

			const currentDate = new Date(initialDate);
			const selectedDate = new Date(year, month, text);

			return selectedDate.toDateString() === currentDate.toDateString();
		});
	}, [day]);

	return (
		<div
			className={`${styles.cell} ${styles[className]} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''} ${hasUncompletedTodos ? styles.highlight : ''}`}
			onClick={() => onClick(new Date(year, month, text))}
		>
			{text}
		</div>
	);
}

export default DatePickerCell;