import styles from '../css/Switcher.module.css';

// components
import Tooltip from '../components/Tooltip';
import { useEffect, useRef, useState } from 'react';

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

	const inputLeftRef = useRef(null);
	const inputRightRef = useRef(null);

	const [leftColor, setLeftColor] = useState('');
	const [rightColor, setRightColor] = useState('');

	useEffect(() => {
		if (inputLeftRef.current) {
			const color = inputLeftRef.current.checked ? activeLeftColor : '';
			setLeftColor(color);
		};

		if (inputRightRef.current) {
			const color = inputRightRef.current.checked ? activeRightColor : '';
			setRightColor(color);
		};
	}, [inputLeftRef.current?.checked, inputRightRef.current?.checked]);

	return (
		<div className={styles.switcher}>
			<input
				ref={inputLeftRef}
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
				ref={inputRightRef}
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

			<div className={styles.highlight} />
		</div>
	);
}

export default Switcher;