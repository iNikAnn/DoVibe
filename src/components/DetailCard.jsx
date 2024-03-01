import styles from '../css/DetailCard.module.css';

// components
import TodoActionBtn from './buttons/TodoActionBtn';

// icon
import { IoArrowUndo } from "react-icons/io5";

function DetailCard({ childrens, onClose }) {
	return (
		<div className={styles.detailCard}>
			<div className={styles.topBtnWrapper}>
				<TodoActionBtn
					title="..."
					icon={<IoArrowUndo />}
					iconColor="#3eb489"
					onClick={onClose}
				/>
			</div>

			{childrens}
		</div>
	);
}

export default DetailCard;