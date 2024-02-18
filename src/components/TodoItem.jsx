import styles from '../css/TodoItem.module.css';

// react, framer
import { useRef } from 'react';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ title, id, bin, isCompleted, onRename, onRemove, onMark }) {
	const todoRef = useRef(null);

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
				<button title="Rename" className={styles.btnRename} onClick={() => onRename(bin, id, title)}><HiMiniPencilSquare /></button>
				<button title='Remove' className={styles.btnRemove} onClick={() => onRemove(bin, id)}><FaTrash /></button>
				<button title='Toggle Todo Status' className={styles.btnMark} onClick={() => onMark(bin, id)}><FaCheck /></button>
			</div>
		</div>
	);
}

export default TodoItem;