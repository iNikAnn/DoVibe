import styles from '../css/FiltersBar.module.css';

// icons
import { BsLayoutSidebarInset } from "react-icons/bs"; // left side bar
import { FaCalendarAlt } from "react-icons/fa"; // all todos
import { FaCalendarDay } from "react-icons/fa"; // todos for the day
import { FaListAlt } from "react-icons/fa"; // only uncompleted todos

// components
import Switcher from '../components/Switcher';
import Filter from './Filter';

function FiltersBar({ initialDate, onChangeViewMode, onToggleLeftSideBar, setOnlyUncompleted, leftSideBarIsVisible, isOnlyUncompleted }) {
	return (
		<div style={{ paddingTop: '1rem' }}>
			<div className={styles.filtersWrapper}>
				<div className={styles.filtersLeft}>
					<Filter
						name="leftSideBar"
						icon={<BsLayoutSidebarInset />}
						tooltip={leftSideBarIsVisible ? 'Hide sidebar' : 'Show sidebar'}
						checked={leftSideBarIsVisible}
						onChange={onToggleLeftSideBar}
					/>
					<span className={styles.separator}>|</span>

					<span style={{ color: 'var(--text-color-primary)' }}>{initialDate ? new Date(initialDate).toLocaleDateString() : 'All todos'}</span>
				</div>

				<div className={styles.filtersRight}>


					<Filter
						name="onlyUncompleted"
						icon={<FaListAlt />}
						tooltip="Show only uncompleted todos"
						checked={isOnlyUncompleted}
						onChange={setOnlyUncompleted}
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
				</div>
			</div >
		</div>
	);
}

export default FiltersBar;