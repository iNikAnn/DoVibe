import styles from '../css/Modal.module.css';

// framer
import { motion } from 'framer-motion';

// icons
import { IoClose } from "react-icons/io5";

function Modal({ children, onClose }) {
	const modalVariants = {
		initial: {
			opacity: 0,
			x: '-50%',
			y: '-40%',
		},

		animate: {
			opacity: 1,
			x: '-50%',
			y: '-50%',
		},

		exit: {
			opacity: 0,
			x: '-50%',
			y: '-40%',
		}
	};

	return (
		<>
			<div className={styles.overlay}></div>

			<motion.div
				{...modalVariants}
				className={styles.modal}
			>
				<button
					className={styles.closeBtn}
					onClick={() => onClose(false)}
				>
					<IoClose />
				</button>

				{children}
			</motion.div>
		</>
	);
}

export default Modal;