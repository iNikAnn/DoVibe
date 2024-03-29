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

	let pressTimer = null;

	const startPress = (e) => {
		pressTimer = setTimeout(() => {
			onLongPress(bin, id, title);
			navigator.vibrate?.([10]);
		}, 200);
	};

	const endPress = () => {
		if (pressTimer) {
			clearTimeout(pressTimer);
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
			onPointerLeave={endPress}

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
					>
						{title.length >= 50 ? title.slice(0, 47).trim() + '...' : title}
					</span>
				</div>

				{description && (
					<MdDescription title="Todo has a description" />
				)}

				{hasReminder && (
					<IoAlarm />
				)}

				{isCurrent && (
					<HiMiniBookmark />
				)}
			</div>

			<div className={styles.btnWrapper}>
				{!isCompleted && (
					<TodoActionBtn
						title="Mark as current"
						icon={isCurrent ? <HiMiniBookmark /> : <HiOutlineBookmark />}
						iconColor="#3eb489"
						onClick={() => onMarkAsCurrent(bin, id)}
					/>
				)}

				{!isCompleted && (
					<TodoActionBtn
						title="Edit todo"
						icon={<HiMiniPencilSquare />}
						iconColor="#7fc7ff"
						onClick={() => onEdit(bin, id, title, description)}
					/>
				)}

				<TodoActionBtn
					title='Remove todo'
					icon={<FaTrash />}
					iconColor="#e4717a"
					onClick={() => onRemove(bin, id)}
				/>

				<TodoActionBtn
					title={`Mark as ${isCompleted ? 'incomplete' : 'complete'}`}
					icon={<FaCheck />}
					iconColor="#3eb489"
					onClick={() => onMark(bin, id)}
				/>
			</div>
		</motion.div>
	);
}

export default TodoItem;