import styles from '../../css/MobileTodoItemMenu.module.css';

// framer
import { motion } from 'framer-motion';

function MobileTodoItemMenu({ children, onClose }) {
	const menuVariants = {
		initial: {
			opacity: 0,
			y: '100%'
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

	const handleDragEnd = (_, info) => {
		if (info.offset.y >= 100) {
			onClose();
			navigator.vibrate?.(10);
		};
	};

	return (
		<motion.div
			className={styles.mobileItemMenu}

			{...menuVariants}

			drag="y"
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragElastic={{ top: 0.1, bottom: 1 }}
			onDragEnd={handleDragEnd}
		>
			<div className={styles.contentWrapper}>
				<div className={styles.dragHandle} />
				{children}
			</div>
		</motion.div>
	);
}

export default MobileTodoItemMenu;