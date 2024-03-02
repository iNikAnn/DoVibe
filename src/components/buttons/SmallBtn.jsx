import styles from '../../css/SmallBtn.module.css';

// components
import Tooltip from '../Tooltip';

function SmallBtn({ title, icon, iconColor, onClick }) {
	return (
		<Tooltip text={title}>
			<button
				className={styles.smallBtn}
				onClick={onClick}
			>
				<span
					style={{ color: iconColor }}
					className={styles.iconWrapper}
				>{icon}</span>
			</button>
		</Tooltip>
	);
}

export default SmallBtn;