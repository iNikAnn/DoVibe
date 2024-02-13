import styles from '../css/FiltersBar.module.css';

// react, framer
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// icons
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";

// components
import DatePicker from '../components/datepicker/DatePicker';

function FiltersBar({ todos, initialDate, onChangeViewMode, setOnlyUncompleted, checkForUnfinishedTodosInDay }) {
	const [datePickerIsHidden, setDatePickerIsHidden] = useState(false);

	return (
		<div className={styles.filtersWrapper}>
			{/* <div className={`${styles.datePickerWrapper}`}>
				<input
					className={styles.datePicker}
					type="date"
					value={initialDate}
					onChange={(e) => onChangeViewMode(e.target.value)}
					name="date"
					id="date"
				/>
			</div> */}

			<button
				className={styles.datePickerBtn}
				onClick={() => setDatePickerIsHidden(!datePickerIsHidden)}
				title='Show date picker'
			>
				{initialDate ? new Date(initialDate).toLocaleDateString() : 'All todos'}
			</button>

			<fieldset className={styles.fieldset}>
				<div className={styles.viewModeWrapper}>
					<input
						className={styles.inputAll}
						type="radio"
						name="range"
						id="all"
						onChange={() => onChangeViewMode('')}
						checked={initialDate ? false : true}
					/>
					<label className={styles.viewModeLabel} htmlFor="all" title="Show all todos">
						{/* <span>All</span> */}
						<FaCalendarAlt />
					</label>

					<input
						className={styles.inputToday}
						type="radio"
						name="range"
						id="oneDay"
						onChange={() => onChangeViewMode(new Date())}
						checked={initialDate ? true : false}
					/>
					<label className={styles.viewModeLabel} htmlFor="oneDay" title="Show todos for the day">
						{/* <span>Day</span> */}
						<FaCalendarDay />
					</label>

					<div className={styles.activeViewMode}></div>
				</div>

				<span className={styles.separator}>|</span>

				<input
					type="checkbox"
					name=""
					id="uncompletedTodo"
					onChange={(e) => setOnlyUncompleted(e.target.checked)}
				/>
				<label className={`${styles.label} ${styles.uncompletedTodo}`} htmlFor="uncompletedTodo" title="Show only uncompleted todos">
					{/* <span>Uncompleted</span> */}
					<FaListAlt />
				</label>
			</fieldset>

			<AnimatePresence>
				{datePickerIsHidden && (
					<DatePicker
						todos={todos}
						initialDate={initialDate}
						onPickDate={onChangeViewMode}
						checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

export default FiltersBar;