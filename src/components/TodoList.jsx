import styles from '../css/TodoList.module.css';

// components
import TodoItem from './TodoItem';

function TodoList({ list, onRenameTodo, onRemoveTodo, onMarkTodo, }) {
	let prevDate = null;

	return (
		<>
			{list &&
				<div className={styles.todoList}>
					{list.map((item) => {
						const currDate = item.bin;
						const binTitle = (currDate !== prevDate)
							? <span className={styles.binTitle}>{currDate}</span>
							: null;

						prevDate = currDate;

						return (
							<>
								{binTitle}

								<TodoItem
									key={item.id}
									{...item}
									onRenameTodo={onRenameTodo}
									onRemoveTodo={onRemoveTodo}
									onMarkTodo={onMarkTodo}
								/>
							</>
						)
					})}
				</div>
			}
		</>
	);
}

export default TodoList;