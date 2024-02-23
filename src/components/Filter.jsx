import styles from '../css/Filter.module.css';

// components
import Tooltip from '../components/Tooltip';

function Filter({ name, icon, text, tooltip, onChange }) {
	return (
		<div className={styles.filter}>
			<input
				className={styles.input}
				name={name}
				type="checkbox"
				id={name}
				onChange={(e) => onChange(e.target.checked)}
				aria-label={tooltip}
			/>

			<Tooltip text={tooltip}>
				<label
					className={styles.label}
					htmlFor={name}
				>
					{icon}
					{text && (
						<span>{text}</span>
					)}
				</label>
			</Tooltip>

			<div className={styles.highlight} />
		</div>
	);
}

export default Filter;