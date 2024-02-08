import styles from '../css/TodoItem.module.css';

// react
import { useEffect, useRef, useState } from 'react';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ index, title, id, bin, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo }) {
	const todoRef = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setVisible(true);
		}, index * 100);
	}, []);

	const handleRemove = () => {
		todoRef.current.classList.add(styles.removingItem);

		setTimeout(() => {
			onRemoveTodo(bin, id, styles);
		}, 600);
	}

	return (
		<li data-id={id} ref={todoRef} className={`${styles.todoItemWrapper} ${visible ? styles.visible : ''}`}>
			<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
				<span className={styles.text}>{title}</span>
			</div>

			<div className={styles.btnWrapper}>
				<button title="Rename" className={styles.btnRename} onClick={() => onRenameTodo(bin, id, title)}><HiMiniPencilSquare /></button>
				<button title='Remove' className={styles.btnRemove} onClick={handleRemove}><FaTrash /></button>
				<button title='Toggle Todo Status' className={styles.btnMark} onClick={() => onMarkTodo(bin, id)}><FaCheck /></button>
			</div>
		</li>
	);
}

export default TodoItem;