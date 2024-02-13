import styles from '../../css/DatePickerCell.module.css';

// react
import { useState } from 'react';

function DatePickerCell({ text, className, year, month, onClick }) {
	const [isToday, setIsToday] = useState(() => {
		const now = new Date();
		const currentDate = new Date(year, month, text);
		return now.toDateString() === currentDate.toDateString();
	});

	return (
		<div
			className={`${styles.cell} ${styles[className]} ${isToday ? styles.today : ''}`}
			onClick={() => onClick(new Date(year, month, text))}
		>
			{text}
		</div>
	);
}

export default DatePickerCell;