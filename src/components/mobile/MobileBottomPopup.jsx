import styles from '../../css/MobileBottomPopup.module.css';

// framer
import { motion } from 'framer-motion';

function MobileBottomPopup({ title, children, onClose }) {
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
			className={styles.mobileBottomPopup}

			{...menuVariants}

			drag="y"
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragElastic={{ top: 0.1, bottom: 1 }}
			onDragEnd={handleDragEnd}
		>
			<div className={styles.contentWrapper}>
				<div className={styles.dragHandle} />

				{title && (
					<>
						<h2 className={styles.title}>{title}</h2>
						<div className={styles.separator} />
					</>
				)}

				{children}
			</div>
		</motion.div>
	);
}

export default MobileBottomPopup;