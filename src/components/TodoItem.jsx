import styles from '../css/TodoItem.module.css';

// react
import { useEffect, useRef } from 'react';

// components
import TodoActionBtn from './buttons/TodoActionBtn';

// icons
import { MdDescription } from "react-icons/md";
import { BsBookmark } from "react-icons/bs"; // mark todo as current
import { BsBookmarkFill } from "react-icons/bs";
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

		// actions
		onOpen,
		onEdit,
		onRemove,
		onMark,
		onMarkAsCurrent,
		onLongPress
	} = props;

	const todoRef = useRef(null);

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
			onLongPress(bin, id, title, description);
		}, 300);
	};

	const endPress = () => {
		if (pressTimer) {
			clearTimeout(pressTimer);
		};
	};
	return (
		<div
			ref={todoRef}
			data-id={id}
			className={`${styles.todoItemWrapper}`}

			onPointerDown={startPress}
			onPointerUp={endPress}
			onPointerLeave={endPress}
		>
			<div className={`${styles.left} ${isCompleted ? styles.isCompleted : ''}`}>
				{description && (
					<MdDescription title="Todo has a description" />
				)}

				<div
					className={`${styles.titleWrapper} ${description ? styles.hasDescription : ''} ${isCurrent ? styles.isCurrent : ''}`}
					onClick={description ? () => onOpen(title, description, bin, isCompleted) : null}
				>
					<span className={styles.title}>{title}</span>
				</div>
			</div>

			<div className={styles.btnWrapper}>
				{!isCompleted && (
					<TodoActionBtn
						title="Mark as current"
						icon={isCurrent ? <BsBookmarkFill /> : <BsBookmark />}
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
		</div>
	);
}

export default TodoItem;