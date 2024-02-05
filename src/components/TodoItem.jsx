import styles from '../css/TodoItem.module.css';

// icons
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

function TodoItem({ title, id, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo }) {
	return (
		<div data-id={id} className={styles.todoItemWrapper}>
			<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
				<span className={styles.text}>{title}</span>
			</div>

			<div className={styles.btnWrapper}>
				<button onClick={() => onRenameTodo(id, title)}><FaEdit /></button>
				<button onClick={() => onRemoveTodo(id)}><FaTrash /></button>
				<button onClick={() => onMarkTodo(id, isCompleted, title)}><FaCheck /></button>
			</div>
		</div>
	);
}

export default TodoItem;