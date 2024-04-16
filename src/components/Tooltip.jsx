import styles from '../css/Tooltip.module.css';

// react
import { useEffect, useRef, useState } from 'react';

function Tooltip({ text, position, children }) {
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

		if (!position) {
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
		};
	}, [isVisible]);

	return (
		<div
			ref={parentRef}
			style={{ position: 'relative' }}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onClick={() => setIsVisible(false)}
		>
			{children}

			<small
				ref={tooltipRef}
				style={tooltipStyles}
				className={`${styles.tooltip} ${isVisible ? styles.visible : ''} ${position ? styles['pos' + position] : ''}`}
			>
				{text}
			</small>
		</div>
	);
}

export default Tooltip;