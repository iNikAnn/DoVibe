import styles from '../../css/MobileTodoItemMenu.module.css';

// framer
import { motion } from 'framer-motion';

function MobileTodoItemMenu({ children }) {
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
	}
	return (
		<motion.div
			{...menuVariants}
			className={styles.mobileItemMenu}
		>
			<div className={styles.contentWrapper}>{children}</div>
		</motion.div>
	);
}

export default MobileTodoItemMenu;