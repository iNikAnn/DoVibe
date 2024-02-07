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
						const binTitle = new Date(currDate).toLocaleDateString(); // the date format adheres to the user's preferences

						// The date is added only once for each day
						const binTitleWrapper = (currDate !== prevDate)
							? <small key={item.bin} className={styles.binTitle}>{binTitle}</small>
							: null;

						prevDate = currDate;

						return (
							<Fragment key={'fragment' + item.id}>
								{binTitleWrapper}

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