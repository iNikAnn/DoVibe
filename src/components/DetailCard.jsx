import styles from '../css/DetailCard.module.css';

// framer
import { motion } from 'framer-motion';

// components
import SmallBtn from './buttons/SmallBtn';
import BtnPrimary from './buttons/BtnPrimary';

// icons
import { FaWindowClose } from "react-icons/fa";

function DetailCard({ childrens, onClose }) {
	const handleDragEnd = (_, info) => {
		if (info.offset.x > 200) {
			onClose();
			navigator.vibrate?.(10);
		};
	};

	const cardVariants = {
		initial: {
			opacity: 0,
			x: '100%'
		},

		animate: {
			opacity: 1,
			x: 0
		},

		exit: {
			opacity: 0,
			x: '100%'
		}
	};

	return (
		<motion.div
			className={styles.detailCard}

			{...cardVariants}
			transition={{ ease: 'easeInOut', duration: .3 }}

			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={{ left: 0, right: 1 }}
			onDragEnd={handleDragEnd}
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