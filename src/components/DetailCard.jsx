import styles from '../css/DetailCard.module.css';

// framer
import { motion } from 'framer-motion';

// components
import TodoActionBtn from './buttons/TodoActionBtn';

// icon
import { IoArrowUndo } from "react-icons/io5";

const cardVariants = {
	initial: {
		opacity: 0,
		transform: 'translateX(25%)'
	},

	animate: {
		opacity: 1,
		transform: 'translateX(0)'
	},

	exit: {
		opacity: 0,
		transform: 'translateX(25%)'
	}
}

function DetailCard({ childrens, onClose }) {
	return (
		<motion.div
			className={styles.detailCard}
			{...cardVariants}
			transition={{ ease: 'easeInOut', duration: .3 }}
		>
			<div className={styles.topBtnWrapper}>
				<TodoActionBtn
					title="..."
					icon={<IoArrowUndo />}
					iconColor="#3eb489"
					onClick={onClose}
				/>
			</div>

			{childrens}
		</motion.div>
	);
}

export default DetailCard;