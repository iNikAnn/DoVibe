import styles from '../../css/SmallBtn.module.css';

// components
import Tooltip from '../Tooltip';

function SmallBtn({ text, title, icon, iconColor, bgColor, onClick, type }) {
	return (
		<Tooltip text={title}>
			<button
				style={{ backgroundColor: bgColor }}
				className={styles.smallBtn}
				onClick={onClick}
				aria-label={title}
				type={type || "button"}
			>
				{text && (
					<span>
						{text}
					</span>
				)}

				{icon && (
					<span
						style={{ color: iconColor }}
						className={styles.iconWrapper}
					>
						{icon}
					</span>
				)}
			</button>
		</Tooltip>
	);
}

export default SmallBtn;