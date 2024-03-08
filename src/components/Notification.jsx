import styles from '../css/Notification.module.css';

// react, framer
import { useState } from 'react';
import { motion, } from 'framer-motion';

function Notification({ onClose, children, onHoverStart, onHoverEnd }) {
	const [isDragging, setIsDragging] = useState(false);
	const [exitX, setExitX] = useState(0);

	const notiVariants = {
		initial: {
			opacity: 0,
			y: '100%',
			x: 0
		},

		animate: {
			opacity: 1,
			y: 0,
			x: 0
		},

		exit: {
			opacity: 0,
			y: isDragging ? 0 : '100%',
			x: exitX
		},
	};

	const handleDragEnd = (_, info) => {
		if (info.offset.x > 100) {
			setExitX('100%');
			onClose();
		}
		else if (info.offset.x < -100) {
			setExitX('-100%');
			onClose();
		}
		else {
			setIsDragging(false);
		};
	};

	return (
		<motion.div
			className={styles.notification}
			{...notiVariants}

			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={1}
			onDragStart={() => setIsDragging(true)}
			onDragEnd={handleDragEnd}

			onHoverStart={onHoverStart}
			onHoverEnd={onHoverEnd}
		>
			<div className={styles.childrenWrapper}>
				{children}
			</div>
		</motion.div>
	);
}

export default Notification;