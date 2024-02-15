import styles from '../css/Modal.module.css';

// framer
import { motion } from 'framer-motion';

// icons
import { IoClose } from "react-icons/io5";

function Modal({ children, onClose }) {
	const modalVariants = {
		initial: {
			opacity: 0,
			top: '50%',
			left: '50%',
			x: '50%',
			transform: 'translate(-50%, -50%) scale(0.9)'
		},

		animate: {
			opacity: 1,
			top: '50%',
			left: '50%',
			x: '50%',
			transform: 'translate(-50%, -50%) scale(1)'
		},

		exit: {
			opacity: 0,
			top: '50%',
			left: '50%',
			x: '50%',
			transform: 'translate(-50%, -50%) scale(0.9)'
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