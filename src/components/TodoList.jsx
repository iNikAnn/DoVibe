import styles from '../css/TodoList.module.css';

// components
import TodoItem from './TodoItem';

function TodoList({ list, onRenameTodo, onRemoveTodo, onMarkTodo, }) {
	return (
		<>
			{list &&
				<div className={styles.todoList}>
					{list.map((item) =>
						<TodoItem
							key={item.id}
							{...item}
							onRenameTodo={onRenameTodo}
							onRemoveTodo={onRemoveTodo}
							onMarkTodo={onMarkTodo}
						/>
					)}
				</div>
			}
		</>
	);
}

export default TodoList;