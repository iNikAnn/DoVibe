import styles from '../../css/SmallBtn.module.css';

// components
import Tooltip from '../Tooltip';

function SmallBtn({ text, title, icon, iconColor, bgColor, onClick }) {
	return (
		<Tooltip text={title}>
			<button
				style={{ backgroundColor: bgColor }}
				className={styles.smallBtn}
				onClick={onClick}
				aria-label={text}
			>
				{text && (
					<span>
						{text}
					</span>
				)}

				<span
					style={{ color: iconColor }}
					className={styles.iconWrapper}
				>
					{icon}
				</span>
			</button>
		</Tooltip>
	);
}

export default SmallBtn;