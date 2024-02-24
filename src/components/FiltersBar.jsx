import styles from '../css/FiltersBar.module.css';

// icons
import { BsLayoutSidebarInset } from "react-icons/bs"; // left side bar
import { FaCalendar } from "react-icons/fa";
import { FaSun } from "react-icons/fa"; // light mode
import { FaMoon } from "react-icons/fa"; // dark mode
import { FaCalendarAlt } from "react-icons/fa"; // all todos
import { FaCalendarDay } from "react-icons/fa"; // todos for the day
import { FaListAlt } from "react-icons/fa"; // only uncompleted todos

// components
import Switcher from '../components/Switcher';
import Filter from './Filter';
import Tooltip from '../components/Tooltip';

function FiltersBar({ initialDate, colorScheme, onChangeScheme, onChangeViewMode, onToggleLeftSideBar, setOnlyUncompleted }) {
	return (
		<div className={styles.filtersWrapper}>
			<div className={styles.filtersLeft}>
				<Filter
					name="leftSideBar"

					icon={<BsLayoutSidebarInset />}
					tooltip="Toggle left side bar"
					onChange={onToggleLeftSideBar}
				/>

				<span className={styles.separator}>|</span>

				<Tooltip text="Show date picker">
					<input type="checkbox" name="datePicker" id="datePicker" />
					<label
						htmlFor="datePicker"
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
		</div >
	);
}

export default FiltersBar;