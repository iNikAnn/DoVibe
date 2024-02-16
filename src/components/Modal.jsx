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

	// when creating custom modal...
	// for 'Cancel' buttons, add the attribute: data-type='cancel'
	// for 'Submit' buttons, add the attribute: type='submit'

	const overlayVariants = {
		initial: {
			opacity: 0
		},

		animate: {
			opacity: 1
		},

		exit: {
			opacity: 0
		},
	};

	return (
		<>
			<motion.div
				key={'overlay'}
				{...overlayVariants}
				className={styles.overlay}
			/>

			<motion.div
				key={'modal'}
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