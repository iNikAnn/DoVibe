import styles from '../css/Notification.module.css';

// framer
import { motion } from 'framer-motion';

function Hotification({ children, onHoverStart, onHoverEnd }) {
	const notiVariants = {
		initial: {
			opacity: 0,
			y: '50%',
			x: '-50%'
		},

		animate: {
			opacity: 1,
			y: 0,
			x: '-50%'
		},

		exit: {
			opacity: 0,
			y: '50%',
			x: '-50%',
		},
	};

	return (
		<motion.div
			{...notiVariants}
			className={styles.notification}
			onHoverStart={onHoverStart}
			onHoverEnd={onHoverEnd}
		>
			{children}
		</motion.div>
	);
}

export default Hotification;