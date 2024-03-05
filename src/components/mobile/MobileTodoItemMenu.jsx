import styles from '../../css/MobileTodoItemMenu.module.css';

// framer
import { motion } from 'framer-motion';

function MobileTodoItemMenu({ children }) {
	const menuVariants = {
		initial: {
			opacity: 0,
			transform: 'translateY(100%)'
		},

		animate: {
			opacity: 1,
			transform: 'translateY(0)'
		},

		exit: {
			opacity: 0,
			transform: 'translateY(100%)'
		},
	};

	return (
		<motion.div
			{...menuVariants}
			transition={{ ease: 'easeInOut', duration: .3 }}
			className={styles.mobileItemMenu}
		>
			<div className={styles.contentWrapper}>{children}</div>
		</motion.div>
	);
}

export default MobileTodoItemMenu;