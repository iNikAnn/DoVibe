import styles from '../../css/DatePicker.module.css';

// react
import { Fragment, useState, useEffect } from 'react';

// components
import DatePickerCell from './DatePickerCell';

// icons
import { IoIosArrowForward } from "react-icons/io";

function DatePicker({ initialDate, onPickDate }) {
	const now = new Date();
	const [year, setYear] = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth());
	const [day, setDay] = useState(now.getDate());
	const [monthName, setMonthName] = useState(now.toLocaleString('default', { month: 'long' }));
	const days = new Date(year, month + 1, 0).getDate();
	const shift = new Date(year, month, 0).getDay();

	// Отрабатывает 2 раза!!!
	// console.log(month);
	// console.log(shift);

	useEffect(() => {
		setMonthName(new Date(year, month, 1).toLocaleString('default', { month: 'long' }));
	}, [month, year]);

	const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const handleChangeMonth = (dir) => {
		const newMonth = month + (dir === 'back' ? -1 : 1);
		const newYear = newMonth < 0 ? year - 1 : newMonth > 11 ? year + 1 : year;
		setMonth((newMonth + 12) % 12);
		setYear(newYear);
	};

	const handleChangeDate = (newDate) => {
		setDay(newDate.getDate());
		onPickDate(newDate);
	};

	return (
		<div className={styles.datePicker}>
			<div className={styles.monthControl}>
				<button onClick={() => handleChangeMonth('back')}><IoIosArrowForward /></button>
				<span>{monthName}</span>
				<button onClick={() => handleChangeMonth('forward')}><IoIosArrowForward /></button>
			</div>

			<div className={styles.days}>
				{[...weekDays, ...Array(shift).fill(null), ...Array(days).fill('day')].map((el, index) =>
					<Fragment key={'fragment' + index}>
						{index <= 6 ? (
							<DatePickerCell key={`weekDay${el}`} text={el} className="weekDay" />
						) : el === 'day' ? (
							<DatePickerCell
								key={`day${index - 6 - shift}`}
								text={index - 6 - shift}
								className="day"
								initialDate={initialDate}
								year={year}
								month={month}
								day={day}
								onClick={handleChangeDate}
							/>
						) : (
							<div key={`shift${index}`} />
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
}

export default DatePicker;