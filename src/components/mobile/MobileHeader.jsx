import styles from '../../css/MobileHeader.module.css';

// framer
import { AnimatePresence, motion } from 'framer-motion';

function MobileHeader({ date, onChangeViewMode }) {
	const selectedDate = new Date(date).toLocaleDateString();

	const viewModeVariants = {
		initial: {
			opacity: 0,
			y: '-100%'
		},

		animate: {
			opacity: 1,
			y: 0
		},

		exit: {
			opacity: 0,
			y: '100%'
		},
	};

	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h2>DoVibe</h2>
			</div>

			<div>
				<AnimatePresence mode='popLayout'>
					{date ? (
						<motion.div
							key="selectedDate"
							{...viewModeVariants}
							onClick={() => onChangeViewMode('')}
						>
							{selectedDate}
						</motion.div>
					) : (
						<motion.div
							key="allTodos"
							{...viewModeVariants}
							onClick={() => onChangeViewMode(new Date())}
						>
							All todos
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
}

export default MobileHeader;