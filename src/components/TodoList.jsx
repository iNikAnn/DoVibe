import styles from '../css/TodoList.module.css';

// react, framer
import { useEffect, useState } from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';

// components
import TodoItem from './TodoItem';

// utils
import insertDateSeparator from '../utils/insertDateSeparator';
import filterTodoList from '../utils/filterTodoList';
import isTodoDraggable from '../utils/isTodoDraggable';

function TodoList({ list, date, showCustomModal, onReorderTodo, onRenameTodo, onRemoveTodo, onMarkTodo, isOnlyUncompleted }) {
	const [delay, setDelay] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [movedItemIndex, setMovedItemIndex] = useState();

	const needFiltering = isOnlyUncompleted;
	const filters = [[isOnlyUncompleted, 'isCompleted']];

	if (!date) {
		list = insertDateSeparator(list);
	};

	if (needFiltering) {
		list = filterTodoList(list, filters);
	};

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
		}, 1200);
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
			margin: 0,
		},

		animate: (index) => ({
			opacity: 1,
			height: 'auto',
			translateY: 0,
			scale: 1,
			margin: 0,

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
			margin: 0,

			transition: {
				ease: 'easeOut',
				duration: .3,
				// height: { delay: delay ? .3 : 0 }
			}
		}
	};

	const dateSeparatorVariants = {
		animate: (index) => ({
			...itemVariants.animate(),
			margin: index ? '2rem 0 0.6rem 0' : '0.6rem 0 0.6rem 0',
		})
	};

	return (
		<div className={styles.todoList}>
			<Reorder.Group
				axis="y"
				values={list ? list : []}
				onReorder={(reorderedList) => onReorderTodo(reorderedList, list[movedItemIndex])}
			>
				<AnimatePresence mode="popLayout">
					{list
						? list.map((item, index) => {
							const isDraggable = isTodoDraggable(list, index);

							return (
								<Reorder.Item
									key={item.id}
									value={item}
									{...itemVariants}
									animate={item.type === 'dateSeparator' ? dateSeparatorVariants.animate : itemVariants.animate}
									custom={index}

									style={{
										position: 'relative',
										cursor: item.type === 'dateSeparator' || item.isCompleted || !isDraggable ? 'auto' : isDragging ? 'grabbing' : 'grab',
									}}

									className={item.type === 'dateSeparator' ? styles.binTitle : ''}

									dragListener={isDraggable}

									onDrag={() => {
										setIsDragging(true);
										setMovedItemIndex(index);
									}}

									onDragEnd={() => setIsDragging(false)}
								>
									{item.type === 'dateSeparator'
										? <div>{item.bin}</div>
										: <TodoItem
											{...item}
											onRename={handleRenameTodo}
											onRemove={handleRemoveTodo}
											onMark={handleMarkTodo}
										/>
									}
								</Reorder.Item>
							)
						}
						) : (
							<motion.li
								key={'noTaskMsg'}
								{...itemVariants}
								className={styles.noTaskMsg}
							>
								No tasks here
							</motion.li>
						)
					}
				</AnimatePresence>
			</Reorder.Group>
		</div >
	);
}

export default TodoList;