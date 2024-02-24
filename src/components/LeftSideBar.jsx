import styles from '../css/LeftSideBar.module.css';

// framer
import { motion } from 'framer-motion';

// components
import DatePicker from './datepicker/DatePicker';

function LeftSideBar({ todos, initialDate, onPickDate, checkForUnfinishedTodosInDay }) {
	const barVariants = {
		initial: {
			opacity: 0,
			x: '-25%'
		},

		animate: {
			opacity: 1,
			x: 0
		},

		exit: {
			opacity: 0,
			x: '-25%'
		},
	};

	return (
		<motion.section
			{...barVariants}
			className={styles.leftSideBar}
		>
			<DatePicker
				todos={todos}
				initialDate={initialDate}
				onPickDate={onPickDate}
				checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
			/>
		</motion.section>
	);
}

export default LeftSideBar;