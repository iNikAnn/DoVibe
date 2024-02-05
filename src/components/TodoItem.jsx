import styles from '../css/TodoItem.module.css';

// icons
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ title, id, isCompleted, onRemoveTodo, onMarkTodo }) {
	return (
		<div
			className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}
		>
			{title}

			<div className={styles.btnWrapper}>
				<button onClick={() => onRemoveTodo(id)}><FaTrash /></button>
				<button onClick={() => onMarkTodo(id)}><FaCheck /></button>
			</div>
		</div>
	);
}

export default TodoItem;