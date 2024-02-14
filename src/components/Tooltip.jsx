import { useEffect, useRef, useState } from 'react';
import styles from '../css/Tooltip.module.css';

function Tooltip({ text, children }) {
	const parentRef = useRef(null);
	const tooltipRef = useRef(null);

	const [tooltipStyles, setTooltipStyles] = useState({});
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const parentRect = parentRef.current.getBoundingClientRect();
		const parentWidth = parentRect.width;

		const tooltipWidth = tooltipRef.current.offsetWidth;

		const spaceLeft = parentRect.left;
		const spaceRigth = document.documentElement.clientWidth - parentRect.right;

		if ((spaceRigth + (parentWidth / 2)) < (tooltipWidth / 2)) {
			setTooltipStyles({
				right: '0',
			});
		} else if ((spaceLeft + (parentWidth / 2)) < (tooltipWidth / 2)) {
			setTooltipStyles({
				left: '0',
			});
		} else {
			setTooltipStyles({
				left: '50%',
				transform: 'translateX(-50%)'
			});
		};
	}, [])

	return (
		<div
			ref={parentRef}
			style={{ position: 'relative' }}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			{children}

			<small
				ref={tooltipRef}
				style={tooltipStyles}
				className={`${styles.tooltip} ${isVisible ? styles.visible : ''}`}
			>
				{text}
			</small>
		</div>
	);
}

export default Tooltip;