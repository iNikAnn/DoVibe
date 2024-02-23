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
import Filter from './Filter';
import Tooltip from '../components/Tooltip';

function FiltersBar({ todos, initialDate, colorScheme, onChangeScheme, onChangeViewMode, setOnlyUncompleted, checkForUnfinishedTodosInDay }) {
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

			<div className={styles.datePickerSwitcher}>
				<Tooltip text="Show date picker">
					<input type="checkbox" name="datePicker" id="datePicker" />
					<label
						htmlFor="datePicker"
						onClick={() => setDatePickerIsHidden(!datePickerIsHidden)}
					>
						<FaCalendar />
						{initialDate ? new Date(initialDate).toLocaleDateString() : 'All todos'}
					</label>
				</Tooltip>
			</div>

			<div className={styles.filtersRight}>
				<Switcher
					name="colorScheme"

					iconLeft={<FaSun />}
					activeLeftColor='#ffcc66'
					tooltipLeft="Light scheme"
					checkedLeft={colorScheme === 'light'}
					onChangeLeft={() => onChangeScheme('light')}

					iconRight={<FaMoon />}
					activeRightColor='#bb88ff'
					tooltipRight="Dark scheme"
					checkedRight={colorScheme === 'dark'}
					onChangeRight={() => onChangeScheme('dark')}
				/>

				<span className={styles.separator}>|</span>

				<Switcher
					name="viewMode"

					iconLeft={<FaCalendarAlt />}
					activeLeftColor='#ff9977'
					tooltipLeft="Show all todos"
					checkedLeft={initialDate ? false : true}
					onChangeLeft={() => onChangeViewMode('')}

					iconRight={<FaCalendarDay />}
					activeRightColor='#ff9977'
					tooltipRight="Show todos for the day"
					checkedRight={initialDate ? true : false}
					onChangeRight={() => onChangeViewMode(new Date())}
				/>

				<span className={styles.separator}>|</span>

				<Filter
					name="onlyUncompleted"

					icon={<FaListAlt />}
					tooltip="Show only uncompleted todos"
					onChange={setOnlyUncompleted}
				/>
			</div>

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