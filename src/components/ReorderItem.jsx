import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";

function ReorderItem(props) {
	const {
		value,
		isDraggable,
		className,
		children,

		onDrag,

		itemVariants,
		animate,
		custom,
	} = props;

	const [isItemCurrentlyDragging, setIsItemCurrentlyDragging] = useState(false);
	const controls = useDragControls();
	let pressTimer = null;

	const startPress = (event) => {
		if (!isDraggable) return;

		if (window.matchMedia('(min-width: 576px)').matches) {
			event.preventDefault();

			pressTimer = setTimeout(() => {
				setIsItemCurrentlyDragging(true);

				controls.start(event);
			}, 750);
		};
	};

	const endPress = () => {
		if (pressTimer) {
			clearTimeout(pressTimer);
		};

		setIsItemCurrentlyDragging(false);
	};

	return (
		<Reorder.Item
			{...itemVariants}
			animate={animate}
			custom={custom}

			value={value}

			style={{
				touchAction: 'pan-y',
				position: 'relative',
				outline: isItemCurrentlyDragging ? '2px solid #1970c2' : 'unset',
				borderRadius: isDraggable ? '1.2rem' : 0,
				cursor: isItemCurrentlyDragging ? 'grabbing' : isDraggable ? 'grab' : 'auto'
			}}

			className={className}

			dragListener={false}
			dragControls={controls}

			onPointerDown={startPress}
			onPointerUp={endPress}
			onPointerLeave={endPress}

			onDrag={onDrag}
		>
			{children}
		</Reorder.Item>
	);
}

export default ReorderItem;