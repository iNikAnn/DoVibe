import styles from '../../css/MobileSettings.module.css';

// components
import Switcher from '../Switcher';
import Filter from '../Filter';

// icons
import { FaSun } from "react-icons/fa"; // light mode
import { FaMoon } from "react-icons/fa"; // dark mode
import { FaCalendarAlt } from "react-icons/fa"; // all todos
import { FaCalendarDay } from "react-icons/fa"; // todos for the day
import { FaListAlt } from "react-icons/fa"; // only uncompleted todos
import Footer from '../Footer';

function MobileSettings(props) {
	const {
		// color scheme switcher
		colorScheme,
		onChangeScheme,

		// view mode
		initialDate,
		onChangeViewMode,

		// filter (is only uncompleted)
		isOnlyUncompleted,
		setOnlyUncompleted
	} = props;

	return (
		<div className={styles.settings}>
			<div className={styles.settingsItem}>
				<span>Color scheme</span>

				<Switcher
					name="colorScheme-mobile"
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
			</div>

			<div className={styles.separator} />

			<div className={styles.settingsItem}>
				<span>View mode</span>

				<Switcher
					name="viewMode-mobile"
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

			<div className={styles.separator} />

			<div className={styles.settingsItem}>
				<span>Show only uncompleted</span>

				<Filter
					name="onlyUncompleted-mobile"
					icon={<FaListAlt />}
					tooltip="Show only uncompleted todos"
					checked={isOnlyUncompleted}
					onChange={setOnlyUncompleted}
				/>
			</div>

			<div className={styles.separator} />

			<div style={{ alignSelf: 'center' }} className={styles.settingsItem}>
				<Footer />
			</div>
		</div>
	);
}

export default MobileSettings;