import styles from '../css/TodoList.module.css';

// react
import { Fragment, useEffect, useState } from 'react';

// components
import TodoItem from './TodoItem';

function TodoList({ list, date, onRenameTodo, onRemoveTodo, onMarkTodo, isOnlyUncompleted, switchPage }) {
	const [showFiltered, setShowFiltered] = useState(false);

	const handleFilterList = () => {
		if (list) {
			let filteredList = list.slice();
			if (isOnlyUncompleted) filteredList = filteredList.filter((todo) => todo.isCompleted === false);
			return filteredList;
		};

		return list;
	};

	let prevDate = null;

	// timeout to ensure the removal animation completes before updating the state
	useEffect(() => {
		setTimeout(() => {
			setShowFiltered(isOnlyUncompleted);
		}, isOnlyUncompleted ? 600 : 0);
	}, [isOnlyUncompleted]);

	return (
		<div className={styles.todoList}>
			{!list
				? <span>No tasks here</span>

				// : (showUpdated ? (showFiltered ? handleFilterList() : list) : prevList).map((item, index) => {
				: (showFiltered ? handleFilterList() : list).map((item, index) => {
					const currDate = item.bin;
					const binTitle = new Date(currDate).toLocaleDateString(); // the date format adheres to the user's preferences

					// The date is added only once for each day
					const binTitleWrapper = (currDate !== prevDate)
						? <small key={item.bin} className={styles.binTitle}>{binTitle}</small>
						: null;

					prevDate = currDate;

					return (
						<Fragment key={'fragment' + item.id}>
							{/* {!date && binTitleWrapper} */}
							<TodoItem
								key={item.id}
								index={index}
								{...item}
								onRenameTodo={onRenameTodo}
								onRemoveTodo={onRemoveTodo}
								onMarkTodo={onMarkTodo}
								isOnlyUncompleted={isOnlyUncompleted}
								date={date}
								switchPage={switchPage}
							/>
						</Fragment>
					)
				})
			}
		</div>
	);
}

export default TodoList;