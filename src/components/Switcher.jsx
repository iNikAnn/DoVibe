import styles from '../css/Switcher.module.css';

// react
import { useEffect, useState } from 'react';

// components
import Tooltip from '../components/Tooltip';

function Switcher(props) {
	const {
		name,

		iconLeft,
		activeLeftColor,
		tooltipLeft,
		checkedLeft,
		onChangeLeft,

		iconRight,
		activeRightColor,
		tooltipRight,
		checkedRight,
		onChangeRight
	} = props;

	const [leftColor, setLeftColor] = useState('');
	const [rightColor, setRightColor] = useState('');

	useEffect(() => {
		setLeftColor(checkedLeft ? activeLeftColor : '');
		setRightColor(checkedRight ? activeRightColor : '');
	}, [checkedLeft, checkedRight]);

	return (
		<div className={styles.switcher}>
			<input
				className={`${styles.input} ${styles.inputLeft}`}
				type="radio"
				name={name}
				id={name + 'InputLeft'}
				checked={checkedLeft}
				onChange={onChangeLeft}
			/>
			<Tooltip text={tooltipLeft}>
				<label
					style={{ color: leftColor }}
					className={styles.label}
					htmlFor={name + 'InputLeft'}
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
					style={{ color: rightColor }}
					className={styles.label}
					htmlFor={name + 'inputRigth'}
				>
					{iconRight}
				</label>
			</Tooltip>

			<div className={styles.highlightWrapper}>
				<div className={styles.highlight} />
			</div>
		</div>
	);
}

export default Switcher;