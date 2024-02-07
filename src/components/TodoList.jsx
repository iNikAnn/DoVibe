import styles from '../css/TodoList.module.css';

// react
import { Fragment } from 'react';

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

						// The date is added only once for each day
						const binTitle = (currDate !== prevDate)
							? <small key={item.bin} className={styles.binTitle}>{currDate}</small>
							: null;

						prevDate = currDate;

						return (
							<Fragment key={'fragment' + item.id}>
								{binTitle}

								<TodoItem
									key={item.id}
									{...item}
									onRenameTodo={onRenameTodo}
									onRemoveTodo={onRemoveTodo}
									onMarkTodo={onMarkTodo}
								/>
							</Fragment>
						)
					})}
				</div>
			}
		</>
	);
}

export default TodoList;