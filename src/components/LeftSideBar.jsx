import styles from '../css/LeftSideBar.module.css';

// framer
import { AnimatePresence, motion } from 'framer-motion';

// components
import DatePicker from './datepicker/DatePicker';
import CurrentTodo from './CurrentTodo';

function LeftSideBar({ initialDate, todos, currentTodo, onPickDate, checkForUnfinishedTodosInDay }) {
	const barVariants = {
		initial: {
			opacity: 0,
			width: 0,
			transform: 'translateX(-2rem)'
		},

		animate: {
			opacity: 1,
			// width: 'auto',
			width: 'calc(2rem * 7 + 1.2rem + 1rem)', // set the width based on the calendar cell size, padding, and left bar padding
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
			transform: 'translateX(-2rem)',

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
				<AnimatePresence initial={false}>
					{currentTodo && (
						<CurrentTodo
							key="currentTodo"
							title={currentTodo.title}
						/>
					)}
				</AnimatePresence>

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