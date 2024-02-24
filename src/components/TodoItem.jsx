import styles from '../css/TodoItem.module.css';

// react, framer
import { useEffect, useRef } from 'react';

// components
import TodoActionBtn from './TodoActionBtn';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ title, id, bin, isCompleted, onRename, onRemove, onMark }) {
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

	return (
		<div
			ref={todoRef}
			data-id={id}
			className={`${styles.todoItemWrapper}`}
		>
			<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
				<span className={styles.text}>{title}</span>
			</div>

			<div className={styles.btnWrapper}>
				<TodoActionBtn
					title="Rename todo"
					icon={<HiMiniPencilSquare />}
					iconColor="#7fc7ff"
					onClick={() => onRename(bin, id, title)}
				/>

				<TodoActionBtn
					title='Remove todo'
					icon={<FaTrash />}
					iconColor="#e4717a"
					onClick={() => onRemove(bin, id)}
				/>

				<TodoActionBtn
					title='Toggle Todo Status'
					icon={<FaCheck />}
					iconColor="#3eb489"
					onClick={() => onMark(bin, id)}
				/>
			</div>
		</div>
	);
}

export default TodoItem;