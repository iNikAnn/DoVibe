import styles from '../css/LeftSideBar.module.css';

// framer
import { motion } from 'framer-motion';

// components
import DatePicker from './datepicker/DatePicker';

function LeftSideBar({ initialDate, todos, currentTodo, onPickDate, checkForUnfinishedTodosInDay }) {
	const barVariants = {
		initial: {
			opacity: 0,
			width: 0,
			transform: 'translateX(-25%)'
		},

		animate: {
			opacity: 1,
			width: 'auto',
			transform: 'translateX(0)',

			transition: {
				ease: 'easeInOut',
				duration: .3,
				opacity: { delay: .3 },
				transform: { delay: .3 }
			}
		},

		exit: {
			opacity: 0,
			width: 0,
			transform: 'translateX(-25%)',

			transition: {
				ease: 'easeInOut',
				duration: .3,

				width: { delay: .3 }
			}
		},
	};

	return (
		<motion.section
			{...barVariants}
			className={styles.leftSideBar}
		>
			<div className={styles.content}>
				{currentTodo && (
					<div>{currentTodo.title}</div>
				)}

				<DatePicker
					todos={todos}
					initialDate={initialDate}
					onPickDate={onPickDate}
					checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
				/>
			</div>
		</motion.section>
	);
}

export default LeftSideBar;