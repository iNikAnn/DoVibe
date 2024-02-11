import styles from '../css/TodoItem.module.css';

// react, transition-group
import { useEffect, useRef, useState } from 'react';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ index, title, id, bin, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo, isOnlyUncompleted, date }) {
	const todoRef = useRef(null);

	const handleRemove = () => {
		onRemoveTodo(bin, id);
	};

	const handleMark = () => {
		onMarkTodo(bin, id);
	};

	return (

		<li data-id={id} ref={todoRef} className={`${styles.todoItemWrapper}`}>
			<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
				<span className={styles.text}>{title}</span>
			</div>

			<div className={styles.btnWrapper}>
				<button title="Rename" className={styles.btnRename} onClick={() => onRenameTodo(bin, id, title)}><HiMiniPencilSquare /></button>
				<button title='Remove' className={styles.btnRemove} onClick={handleRemove}><FaTrash /></button>
				<button title='Toggle Todo Status' className={styles.btnMark} onClick={handleMark}><FaCheck /></button>
			</div>
		</li>
	);
}

export default TodoItem;