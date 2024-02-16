import styles from '../css/FiltersBar.module.css';

// react, framer
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// icons
import { FaCalendar } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";

// components
import DatePicker from '../components/datepicker/DatePicker';
import Switcher from '../components/Switcher';
import Tooltip from '../components/Tooltip';

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
			{/*
			<Tooltip text="Show date picker">
				<button
					className={styles.datePickerBtn}
					onClick={() => setDatePickerIsHidden(!datePickerIsHidden)}
				>
					<FaCalendar />
					{initialDate ? new Date(initialDate).toLocaleDateString() : 'All todos'}
				</button>
			</Tooltip> */}

			<Tooltip text="Show date picker">
				<input className={styles.datePickerCheckbox} type="checkbox" name="datePicker" id="datePicker" />
				<label
					htmlFor="datePicker"
					className={`${styles.label} ${styles.datePickerLabel}`}
					onClick={() => setDatePickerIsHidden(!datePickerIsHidden)}
				>
					<FaCalendar />
					{initialDate ? new Date(initialDate).toLocaleDateString() : 'All todos'}
				</label>
			</Tooltip>

			<Switcher
				name="colorScheme"

				iconLeft={<FaSun />}
				tooltipLeft="Light"

				iconRight={<FaMoon />}
				tooltipRight="Dark"
			/>

			<Switcher
				name="viewMode"

				iconLeft={<FaCalendarAlt />}
				tooltipLeft="Show all todos"
				checkedLeft={initialDate ? false : true}
				onChangeLeft={() => onChangeViewMode('')}

				iconRight={<FaCalendarDay />}
				tooltipRight="Show todos for the day"
				checkedRight={initialDate ? true : false}
				onChangeRight={() => onChangeViewMode(new Date())}
			/>

			<fieldset className={styles.fieldset}>
				<span span className={styles.separator} >|</span>

				<Tooltip text="Show only uncompleted todos">
					<input
						type="checkbox"
						name=""
						id="uncompletedTodo"
						onChange={(e) => setOnlyUncompleted(e.target.checked)}
					/>

					<label className={`${styles.label} ${styles.uncompletedTodo}`} htmlFor="uncompletedTodo">
						<span>Uncompleted</span>
						<FaListAlt />
					</label>
				</Tooltip>
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
		</div >
	);
}

export default FiltersBar;