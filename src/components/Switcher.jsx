import styles from '../css/Switcher.module.css';

// components
import Tooltip from '../components/Tooltip';

function Switcher(props) {
	const {
		name,

		iconLeft,
		tooltipLeft,
		checkedLeft,
		onChangeLeft,

		iconRight,
		tooltipRight,
		checkedRight,
		onChangeRight
	} = props;

	return (
		<div className={styles.switcher}>
			<input
				className={`${styles.input} ${styles.inputLeft}`}
				type="radio"
				name={name}
				id={name + 'inputLeft'}
				checked={checkedLeft}
				onChange={onChangeLeft}
			/>
			<Tooltip text={tooltipLeft}>
				<label
					className={styles.label}
					htmlFor={name + 'inputLeft'}
				>
					{iconLeft}
				</label>
			</Tooltip>

			<input
				className={`${styles.input} ${styles.inputRigth}`}
				type="radio"
				name={name}
				id={name + 'inputRigth'}
				checked={checkedRight}
				onChange={onChangeRight}
			/>
			<Tooltip text={tooltipRight}>
				<label
					className={styles.label}
					htmlFor={name + 'inputRigth'}
				>
					{iconRight}
				</label>
			</Tooltip>

			<div className={styles.highlight} />
		</div>
	);
}

export default Switcher;