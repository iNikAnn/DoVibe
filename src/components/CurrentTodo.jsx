import styles from '../css/CurrentTodo.module.css';

// framer
import { motion } from 'framer-motion';

function CurrentTodo({ title }) {
	const currentTodoVariants = {
		initial: {
			opacity: 0,
			height: 0,
			transform: 'translateY(-2rem)'
		},

		animate: {
			opacity: 1,
			height: 'auto',
			transform: 'translateY(0)',

			transition: {
				duration: .3,

				opacity: { delay: .3 },
				transform: { delay: .3 }
			}
		},

		exit: {
			opacity: 0,
			height: 0,
			transform: 'translateY(-2rem)',

			transition: {
				duration: .3,

				height: { delay: .3 }
			}
		},
	}

	return (
		<motion.div {...currentTodoVariants}>
			<div className={`${styles.currentTodo}`}>
				<small className={styles.badge}>Current todo</small>
				<div className={styles.titleWrapper}>{title}</div>
			</div>
		</motion.div>
	);
}

export default CurrentTodo;