import styles from '../css/DetailCard.module.css';

// framer
import { motion } from 'framer-motion';

// components
import SmallBtn from './buttons/SmallBtn';
import BtnPrimary from './buttons/BtnPrimary';

// icon
import { FaWindowClose } from "react-icons/fa";

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
};

function DetailCard({ childrens, onClose }) {
	return (
		<motion.div
			className={styles.detailCard}
			{...cardVariants}
			transition={{ ease: 'easeInOut', duration: .3 }}
		>
			{!window.matchMedia('(max-width: 576px)').matches && (
				<div className={styles.titleBar}>
					<span>Todo details</span>
					<div className={styles.btnWrapper}>
						<SmallBtn
							title="Close"
							icon={<FaWindowClose />}
							// iconColor="#3eb489"
							onClick={onClose}
						/>
					</div>
				</div>
			)}

			{childrens}

			{window.matchMedia('(max-width: 576px)').matches && (
				<div className={styles.bottomBtnWrapper}>
					<BtnPrimary
						text="Close"
						onClick={onClose}
					/>
				</div>)}
		</motion.div>
	);
}

export default DetailCard;