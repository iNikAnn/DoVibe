import styles from '../../css/MobileSettings.module.css';

// components
import Switcher from '../Switcher';
import Filter from '../Filter';
import Footer from '../Footer';

// icons
import { IoNotifications } from "react-icons/io5";
import { IoNotificationsOff } from "react-icons/io5";
import { FaSun } from "react-icons/fa"; // light mode
import { FaMoon } from "react-icons/fa"; // dark mode
import { FaCalendarAlt } from "react-icons/fa"; // all todos
import { FaCalendarDay } from "react-icons/fa"; // todos for the day
import { FaListAlt } from "react-icons/fa"; // only uncompleted todos
import { BsEmojiLaughingFill } from "react-icons/bs";

function MobileSettings(props) {
	const {
		// notifications
		isNotifEnabled,
		onToogleNotif,

		// color scheme switcher
		colorScheme,
		onChangeScheme,

		// add random emoji
		addRandomEmoji,
		onToggleRandomEmoji,

		// view mode
		initialDate,
		onChangeViewMode,

		// filter (is only uncompleted)
		isOnlyUncompleted,
		setOnlyUncompleted
	} = props;

	let pressTimer;

	const startPress = () => {
		pressTimer = setTimeout(() => {
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.showNotification('DoVibe', {
						body: "If you're seeing this, it means the notification has been successfully sent."
					});
				});
			};
		}, 3000);
	};

	const endPress = () => {
		clearTimeout(pressTimer);
	};

	return (
		<div className={styles.settings}>
			<div className={styles.settingsItem}>
				<span
					onPointerDown={startPress}
					onPointerUp={endPress}
				>
					Notifications
				</span>

				<Switcher
					name="notifications-mobile"
					iconLeft={<IoNotificationsOff />}
					activeLeftColor='#e4717a'
					tooltipLeft="Light scheme"
					checkedLeft={!isNotifEnabled}
					onChangeLeft={() => onToogleNotif(false)}
					iconRight={<IoNotifications />}
					activeRightColor='#7fc7ff'
					tooltipRight="Dark scheme"
					checkedRight={isNotifEnabled}
					onChangeRight={() => onToogleNotif(true)}
				/>
			</div>

			<div className={styles.separator} />

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
				<div style={{ textAlign: 'left' }}>
					<span>Add random emoji<br /></span>
					<small className={styles.itemDesc}>Adds random emoji at todo creation</small>
				</div>

				<Filter
					name="addRandomEmoji"
					icon={<BsEmojiLaughingFill />}
					tooltip={`${addRandomEmoji ? 'Disable' : 'Enable'} random emoji at the start`}
					checked={addRandomEmoji}
					onChange={onToggleRandomEmoji}
				/>
			</div>

			<div className={styles.separator} />

			<div className={styles.settingsItem}>
				<div style={{ textAlign: 'left' }}>
					<span>View mode<br /></span>
					<small className={styles.itemDesc}>Toggle all vs. one-day view</small>
				</div>

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

			<div className={styles.settingsItem}>
				<Footer />
			</div>
		</div>
	);
}

export default MobileSettings;