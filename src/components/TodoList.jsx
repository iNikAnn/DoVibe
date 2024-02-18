import styles from '../css/TodoList.module.css';

// react, framer
import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';

// components
import TodoItem from './TodoItem';

function TodoList({ list, showCustomModal, onReorderTodo, onRenameTodo, onRemoveTodo, onMarkTodo, isOnlyUncompleted }) {
	const [showFiltered, setShowFiltered] = useState(false);

	// motion
	const [delay, setDelay] = useState(false);

	let prevDate = null;

	const handleFilterList = () => {
		if (list) {
			let filteredList = list.slice();
			if (isOnlyUncompleted) filteredList = filteredList.filter((todo) => todo.isCompleted === false);
			return filteredList;
		};

		return list;
	};

	// timeout to ensure the removal animation completes before updating the state
	useEffect(() => {
		setShowFiltered(isOnlyUncompleted);
	}, [isOnlyUncompleted]);

	const handleRenameTodo = (bin, id, title) => {
		showCustomModal(
			<form
				action="submit"
				onSubmit={(e) => {
					e.preventDefault();
					onRenameTodo(bin, id, e.target.newTitle.value);
					showCustomModal(null);
				}}
			>
				<h3>Enter new title</h3>
				<input type="text" name="newTitle" id="newTitle" defaultValue={title} autoFocus />
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
					<button style={{ flex: 1 }} data-type="cancel">Cancel</button>
					<button style={{ flex: 1 }} type="submit">Rename</button>
				</div>
			</form>
		)
	};

	const handleRemoveTodo = (bin, id) => {
		setDelay(true);

		setTimeout(() => {
			onRemoveTodo(bin, id);
		}, 0);

		setTimeout(() => {
			setDelay(false);
		}, 600);
	};

	const handleMarkTodo = (bin, id) => {
		setDelay(true);

		setTimeout(() => {
			onMarkTodo(bin, id);
		}, 0);

		setTimeout(() => {
			setDelay(false);
		}, 1200);
	};

	const itemVariants = {
		initial: {
			opacity: 0,
			height: 0,
			translateY: '-2rem',
			scale: 1,
		},

		animate: (index) => ({
			opacity: 1,
			height: 'auto',
			translateY: 0,
			scale: 1,

			transition: {
				ease: 'easeOut',
				delay: index * (delay ? 0 : .1),
				duration: .3
			}
		}),

		exit: {
			opacity: 0,
			height: 0,
			translateY: 0,
			scale: delay ? .9 : 1,

			transition: {
				ease: 'easeOut',
				duration: .3,
				height: { delay: delay ? .3 : 0 }
			}
		}
	};

	return (
		<div className={styles.todoList}>
			<Reorder.Group axis="y" values={list ? list : []} onReorder={onReorderTodo}>
				<AnimatePresence>
					{list
						? (showFiltered ? handleFilterList() : list).map((item, index) => {
							const currDate = item.bin;
							const binTitle = new Date(currDate).toLocaleDateString(); // the date format adheres to the user's preferences
							// the date is added only once for each day

							const binTitleWrapper = (currDate !== prevDate)
								? <small key={item.bin} className={`${styles.binTitle}`}>{binTitle}</small>
								: null;
							prevDate = currDate;

							return (
								<Fragment key={'fragment' + item.id}>
									{/* {!date && binTitleWrapper} */}
									<Reorder.Item
										key={item.id}
										value={item}
										{...itemVariants}
										custom={index}
									>
										<TodoItem
											{...item}
											onRename={handleRenameTodo}
											onRemove={handleRemoveTodo}
											onMark={handleMarkTodo}
										/>
									</Reorder.Item>
								</Fragment>
							);
						})
						: <span key={'noTaskMsg'}>No tasks here</span>
					}
				</AnimatePresence>
			</Reorder.Group>
		</div>
	);
}

export default TodoList;