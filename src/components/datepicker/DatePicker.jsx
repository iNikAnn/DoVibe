import styles from '../../css/DatePicker.module.css';

// react
import { useState, useEffect } from 'react';

// components
import DatePickerCell from './DatePickerCell';

// icons
import { IoIosArrowForward } from "react-icons/io";

function DatePicker({ todos, initialDate, onPickDate, checkForUnfinishedTodosInDay }) {
	const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const now = new Date();
	const [year, setYear] = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth());
	const [day, setDay] = useState(now.getDate());
	const [monthName, setMonthName] = useState(now.toLocaleString('default', { month: 'long' }));
	const days = new Date(year, month + 1, 0).getDate();
	const shift = new Date(year, month, 1).getDay();

	useEffect(() => {
		setMonthName(new Date(year, month, 1).toLocaleString('default', { month: 'long' }));
	}, [month]);

	const handleChangeYear = (dir) => {
		setYear((currYear) => currYear + (dir === 'back' ? -1 : 1));
	};

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
			<div>
				<div className={styles.controls}>
					<button onClick={() => handleChangeYear('back')}><IoIosArrowForward /></button>
					<span>{year}</span>
					<button onClick={() => handleChangeYear('forward')}><IoIosArrowForward /></button>
				</div>

				<div className={styles.controls}>
					<button onClick={() => handleChangeMonth('back')}><IoIosArrowForward /></button>
					<span>{monthName}</span>
					<button onClick={() => handleChangeMonth('forward')}><IoIosArrowForward /></button>
				</div>
			</div>

			<div className={styles.days}>
				{weekDays.map((weekDay) =>
					<small
						key={weekDay}
						className={styles.weekDay}
					>
						{weekDay}
					</small>
				)}

				{
					// generate an array of empty cells to fill at the beginning of the month
					Array(shift === 0 ? 6 : shift - 1).fill(null).map((_, index) => <div key={'empty' + index} />)
				}

				{[...Array(days).fill('day')].map((_, index) =>
					<DatePickerCell
						key={`${year}-${month}-${index + 1}`}
						todos={todos}
						text={index + 1}
						initialDate={initialDate}
						year={year}
						month={month}
						day={day}
						onSelectDay={handleChangeDate}
						checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
					/>
				)}
			</div>
		</div>
	);
}

export default DatePicker;