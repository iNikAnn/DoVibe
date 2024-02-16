import styles from '../css/Filter.module.css';

// components
import Tooltip from '../components/Tooltip';

function Filter({ name, icon, tooltip, onChange }) {
	return (
		<div className={styles.filter}>
			<Tooltip text={tooltip}>
				<input
					className={styles.input}
					name={name}
					type="checkbox"
					id={name}
					onChange={(e) => onChange(e.target.checked)}
				/>

				<label
					className={styles.label}
					htmlFor={name}
				>
					{icon}
				</label>
			</Tooltip>
		</div>
	);
}

export default Filter;