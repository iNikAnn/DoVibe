import styles from '../css/TodoItem.module.css';

// react, framer
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// components
import TodoActionBtn from './buttons/TodoActionBtn';

// icons
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";
import { MdDescription } from "react-icons/md";
import { HiMiniBookmark } from "react-icons/hi2";// mark todo as current
import { HiOutlineBookmark } from "react-icons/hi2";
import { HiMiniPencilSquare } from "react-icons/hi2"; // edit todo
import { FaTrash } from "react-icons/fa"; // remove todo
import { FaCheck } from "react-icons/fa";	// mark todo as complete

function TodoItem(props) {
	const {
		title,
		description,
		id,
		bin,
		isCompleted,
		isCurrent,
		hasReminder,

		// actions
		onOpen,
		onEdit,
		onRemove,
		onMark,
		onMarkAsCurrent,
		onLongPress,

		isMobileVersion
	} = props;

	const todoRef = useRef(null);

	// set 'bg' state with the value of the '--bg' CSS variable
	const [bg, setBg] = useState('');

	useEffect(() => {
		setBg(getComputedStyle(document.documentElement).getPropertyValue('--bg-color-secondary'));
	}, []);

	// enables keyboard focus styling for the todo item using :focus-visible pseudoclass
	useEffect(() => {
		const item = todoRef.current;

		const handleFocus = () => {
			if (item.querySelector(':focus-visible')) {
				item.classList.add(styles.focus);
			};
		};

		const handleBlur = () => {
			if (!item.querySelector(':focus-visible')) {
				item.classList.remove(styles.focus);
			};
		};

		item.addEventListener('focusin', handleFocus);
		item.addEventListener('focusout', handleBlur);

		return () => {
			item.removeEventListener('focusin', handleFocus);
			item.removeEventListener('focusout', handleBlur);
		};
	}, []);

	// prevents menu invocation if pointer moved
	let pressTimer = null;
	let startCoordinates = null;
	let isMoved = false;

	const startPress = (e) => {
		startCoordinates = { x: e.clientX, y: e.clientY };

		pressTimer = setTimeout(() => {
			if (startCoordinates && !isMoved) {
				onLongPress(bin, id, title);
				navigator.vibrate?.([10]);
			};
		}, 200);
	};

	const handleMove = (e) => {
		if (startCoordinates) {
			const dx = Math.abs(e.clientX - startCoordinates.x);
			const dy = Math.abs(e.clientY - startCoordinates.y);

			if (dx > 5 || dy > 5) {
				isMoved = true;
			};
		};
	};

	const endPress = () => {
		if (pressTimer) {
			clearTimeout(pressTimer);
			startCoordinates = null;
			isMoved = false;
		};
	};

	const tapStyle = isMobileVersion ? { backgroundColor: bg } : {};

	return (
		<motion.div
			ref={todoRef}
			data-id={id}
			className={`${styles.todoItemWrapper}`}

			onPointerDown={startPress}
			onPointerUp={endPress}
			onPointerMove={handleMove}

			whileTap={tapStyle}
		>
			<div className={`${styles.left} ${isCompleted ? styles.isCompleted : ''}`}>
				{isMobileVersion && (
					<div
						className={styles.markTodoIconWrapper}
						onClick={() => onMark(bin, id)}
					>
						{isCompleted ? <FaRegCheckCircle /> : <FaRegCircle />}
					</div>
				)}

				<div
					className={`${styles.titleWrapper} ${description ? styles.hasDescription : ''} ${isCurrent ? styles.isCurrent : ''}`}
					onClick={description ? () => onOpen(title, description, bin, isCompleted) : null}
				>
					<span
						className={styles.title}
						title={title}
					>
						{title.length >= 70 ? title.slice(0, 67).trim() + '...' : title}
					</span>
				</div>

				{description && (
					<MdDescription title="Todo has a description" />
				)}

				{hasReminder && (
					<IoAlarm />
				)}

				{isCurrent && (
					<HiMiniBookmark color="var(--color-green)" />
				)}
			</div>

			<div className={styles.btnWrapper}>
				{!isCompleted && (
					<TodoActionBtn
						title="Mark as current"
						icon={isCurrent ? <HiMiniBookmark /> : <HiOutlineBookmark />}
						// iconColor="#3eb489"
						iconColorOnHover="Green"
						onClick={() => onMarkAsCurrent(bin, id)}
					/>
				)}

				{!isCompleted && (
					<TodoActionBtn
						title="Edit todo"
						icon={<HiMiniPencilSquare />}
						// iconColor="#7fc7ff"
						iconColorOnHover="Blue"
						onClick={() => onEdit(bin, id, title, description)}
					/>
				)}

				<TodoActionBtn
					title='Remove todo'
					icon={<FaTrash />}
					// iconColor="#e4717a"
					iconColorOnHover="Red"
					onClick={() => onRemove(bin, id)}
				/>

				<TodoActionBtn
					title={`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}
					icon={<FaCheck />}
					// iconColor="#3eb489"
					iconColorOnHover="Green"
					onClick={() => onMark(bin, id)}
				/>
			</div>
		</motion.div>
	);
}

export default TodoItem;