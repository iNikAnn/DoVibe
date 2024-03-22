import styles from '../css/TodoList.module.css';

// react, framer
import { useEffect, useState } from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';

// components
import TodoItem from './TodoItem';
import TodoDetails from './TodoDetails';
import DetailCard from './DetailCard';
import ReorderItem from './ReorderItem';
import Tooltip from './Tooltip';

// utils
import insertDateSeparator from '../utils/insertDateSeparator';
import filterTodoList from '../utils/filterTodoList';
import isTodoDraggable from '../utils/isTodoDraggable';

function TodoList(props) {
	let {
		list,
		date,
		showCustomModal,
		onChangeViewMode,

		onReorderTodo,
		onSetReminder,
		onEditTodo,
		onRemoveTodo,
		onMarkTodo,
		onMarkTodoAsCurrent,

		onShowItemMenu,
		onCloseItemMenu,

		isOnlyUncompleted,

		isTodoOpen,
		onToggleTodo,

		isMobileVersion
	} = props;

	const [delay, setDelay] = useState(false);
	const [movedItemIndex, setMovedItemIndex] = useState();

	const needFiltering = isOnlyUncompleted;
	const filters = [[isOnlyUncompleted, 'isCompleted']];

	const [detailCardContent, setDetailCardContent] = useState(null);

	if (!date) {
		list = insertDateSeparator(list);
	};

	if (needFiltering) {
		list = filterTodoList(list, filters);
	};

	// disable scrolling when a todo is open
	useEffect(() => {
		if (isTodoOpen) {
			document.body.style.setProperty('overflow-y', 'hidden');
		} else {
			document.body.style.setProperty('overflow', 'scroll');
		};
	}, [isTodoOpen]);

	// close the todo when the date is changed
	useEffect(() => {
		if (isTodoOpen) {
			onToggleTodo();
		};
	}, [date]);

	const handleOpenTodo = (title, desc, bin, isCompleted) => {
		const props = { title, desc, bin, isCompleted };

		setDetailCardContent(
			<TodoDetails
				title={title}
				desc={desc}
				bin={bin}
				isCompleted={isCompleted}
			/>
		);

		onToggleTodo(props);
	};

	const handleEditTodo = (bin, id, title, desc) => {
		showCustomModal(
			<form
				action="submit"
				onSubmit={(e) => {
					e.preventDefault();
					onEditTodo(bin, id, e.target.newTitle.value, e.target.newDesc.value);
					showCustomModal(null);
				}}
			>
				<h3>Edit todo</h3>

				<label htmlFor="newTitle">
					New title:
					<input type="text" name="newTitle" id="newTitle" defaultValue={title} autoFocus />
				</label>

				<label htmlFor="newDesc">
					New description:
					<textarea name="newDesc" id="newDesc" cols="1" rows="3" defaultValue={desc}></textarea>
				</label>

				<div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
					<button style={{ flex: 1 }} type="button" data-type="cancel" onClick={() => showCustomModal(null)}>Cancel</button>
					<button style={{ flex: 1 }} type="submit">Save</button>
				</div>
			</form>
		);
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
		if (!isMobileVersion) {
			setDelay(true);
		};

		setTimeout(() => {
			onMarkTodo(bin, id);
		}, 0);

		if (!isMobileVersion) {
			setTimeout(() => {
				setDelay(false);
			}, 1200);
		};
	};

	const handleLongPress = (bin, id, title) => {
		const props = { bin, id, title };
		onShowItemMenu(props);
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
			margin: index ? '1.2rem 0 0.6rem 0' : '0.6rem 0 0.6rem 0',
		})
	};

	return (
		<div className={styles.todoList}>
			<AnimatePresence>
				{(isTodoOpen && !isMobileVersion) && (
					<DetailCard
						key="detailCard"
						childrens={detailCardContent}
						onClose={onToggleTodo}
					/>
				)}
			</AnimatePresence>

			<Reorder.Group
				className={(isTodoOpen && !isMobileVersion) ? styles.hidden : ''}
				axis="y"
				values={list ? list : []}
				onReorder={(reorderedList) => onReorderTodo(reorderedList, list[movedItemIndex])}
			>
				<AnimatePresence initial={false} mode="popLayout">
					{list && list.length > 0
						? list.map((item, index) => {
							const isDraggable = isTodoDraggable(list, index);
							const isDateSeparator = item.type === 'dateSeparator';

							let element = null;

							if (isDateSeparator) {
								const separatorDate = new Date(item.bin);
								const isToday = separatorDate.toDateString() === new Date().toDateString();

								element = (
									<div style={{ display: 'flex' }}>
										<Tooltip text="Switch to this date">
											<button
												className={`${styles.binTitleBtn} ${isToday ? styles.isToday : ''}`}
												onClick={() => onChangeViewMode(separatorDate)}
												type='button'
											>
												{separatorDate.toLocaleDateString() + (isToday ? ' - Today' : '')}
											</button>
										</Tooltip>
									</div>);
							} else {
								element = (
									<TodoItem
										{...item}
										onOpen={handleOpenTodo}
										onEdit={handleEditTodo}
										onRemove={handleRemoveTodo}
										onMark={handleMarkTodo}
										onMarkAsCurrent={onMarkTodoAsCurrent}
										onLongPress={handleLongPress}
										isMobileVersion={isMobileVersion}
									/>
								);
							};

							return (
								<ReorderItem
									key={item.id}
									value={item}

									itemVariants={itemVariants}
									animate={isDateSeparator ? dateSeparatorVariants.animate : itemVariants.animate}
									custom={index}

									isDraggable={isDraggable}

									className={isDateSeparator ? styles.binTitle : ''}

									onDrag={() => {
										setMovedItemIndex(index);
									}}
								>
									{element}
								</ReorderItem>
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