import styles from '../css/TodoItem.module.css';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ title, id, bin, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo }) {
	return (
		<div data-id={id} className={styles.todoItemWrapper}>
			<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
				<span className={styles.text}>{title}</span>
			</div>

			<div className={styles.btnWrapper}>
				<button title="Rename" className={styles.btnRename} onClick={() => onRenameTodo(bin, id, title)}><HiMiniPencilSquare /></button>
				<button title='Remove' className={styles.btnRemove} onClick={() => onRemoveTodo(bin, id)}><FaTrash /></button>
				<button title='Toggle Todo Status' className={styles.btnMark} onClick={() => onMarkTodo(bin, id)}><FaCheck /></button>
			</div>
		</div>
	);
}

export default TodoItem;