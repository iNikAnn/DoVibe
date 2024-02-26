import styles from '../css/TodoApp.module.css';

// react, uuid, framer
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence } from 'framer-motion';

// components
import InputBar from './InputBar';
import FiltersBar from './FiltersBar';
import TodoList from './TodoList';
import Footer from './Footer';
import Modal from '../components/Modal';
import Notification from './Hotification';

// utils
import getFormattedDate from '../utils/getFormattedDate';
import modifyDateByOneDay from '../utils/modifyDateByOneDay';
import isTodoDuplicate from '../utils/isTodoDuplicate';
import isIdDuplicate from '../utils/isIdDuplicate';
import sortTodosByCompletion from '../utils/sortTodosByCompletion';

// icons
import { FaUndoAlt } from "react-icons/fa";
import LeftSideBar from './LeftSideBar';

function TodoApp() {
	const inputBarRef = useRef(null);
	const storredSettings = JSON.parse(localStorage.getItem('settings'));

	// color scheme
	const [colorScheme, setColorScheme] = useState(() => {
		if (storredSettings && storredSettings.colorScheme) {
			return storredSettings.colorScheme;
		} else {
			return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		};
	});

	// date
	const today = getFormattedDate(new Date());
	const [date, setDate] = useState(() => {
		return storredSettings ? storredSettings.date : '';
	});

	// todos
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});
	const allTodos = Object.values(todos).map((arr) => arr.slice().reverse()).flat().reverse();

	// filters
	const [isOnlyUncompleted, setOnlyUncompleted] = useState(() => {
		return storredSettings ? storredSettings.filters.isOnlyUncompleted : false;
	});

	// left sidebar
	const [leftSideBarIsVisible, setLeftSideBarIsVisible] = useState(() => {
		return storredSettings ? storredSettings.leftSideBar : false;
	});
	const [currentTodo, setCurrentTodo] = useState(JSON.parse(localStorage.getItem('currentTodo')) || null);

	// notification
	const [notifIsVisible, setNotifIsVisible] = useState(false);
	const [notifContent, setNotifContent] = useState(null);
	const hideNotifTimeOutRef = useRef(null);

	// modal
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	// save todos to local storage
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
		localStorage.setItem('currentTodo', JSON.stringify(currentTodo));
	}, [todos, currentTodo]);

	// save settings to local storage
	useEffect(() => {
		const settings = {
			leftSideBar: leftSideBarIsVisible,
			colorScheme,
			date,
			filters: {
				isOnlyUncompleted
			},
		};

		localStorage.setItem('settings', JSON.stringify(settings));
	}, [leftSideBarIsVisible, colorScheme, date, isOnlyUncompleted]);

	// initialize scheme on first load
	useEffect(() => {
		document.documentElement.setAttribute('data-scheme', colorScheme);
	}, []);

	// highlights the inputbar parent form based on input focus
	useEffect(() => {
		const handleHighlightInputBar = () => {
			inputBarRef.current.closest('form').classList.add('focus');
		};

		const handleBlurInputBar = () => {
			inputBarRef.current.closest('form').classList.remove('focus');
		};

		inputBarRef.current.addEventListener('focus', handleHighlightInputBar);
		inputBarRef.current.addEventListener('blur', handleBlurInputBar);

		return () => {
			inputBarRef.current.removeEventListener('focus', handleHighlightInputBar);
			inputBarRef.current.removeEventListener('blur', handleBlurInputBar);
		}
	}, []);

	// change the date by pressing comma / period
	useEffect(() => {
		const handleChangeDate = (e) => {
			if (((e.ctrlKey || e.metaKey) && e.altKey)
				&& (e.code === 'Comma' || e.code === 'Period')) {
				setDate(modifyDateByOneDay(date, e.code));
			};
		};

		window.addEventListener('keydown', handleChangeDate);
		inputBarRef.current.focus();  // highlight the input after loading or changing the date

		return () => window.removeEventListener('keydown', handleChangeDate);
	}, [date]);

	// checks if there are unfinished todos for a specific date
	const checkForUnfinishedTodosInDay = (date) => {
		const formattedDate = getFormattedDate(date);

		if (todos[formattedDate]) {
			return Boolean(todos[formattedDate].find((todo) => !todo.isCompleted));
		};

		return false;
	};

	// change color scheme
	const handleChangeScheme = (newScheme) => {
		document.documentElement.setAttribute('data-scheme', newScheme);

		// localStorage.setItem('scheme', newScheme);

		setColorScheme(newScheme);
	};

	// change view mode
	const handleChangeViewMode = (date) => {
		setDate(date ? getFormattedDate(date) : '');
	};

	// add todo
	const handleAddTodo = (input) => {
		const day = date ? date : today;

		if (isTodoDuplicate(todos[day], input)) return;

		const updatedTodos = { ...todos };
		const newTodo = {
			title: input,
			id: uuidv4(),
			isCompleted: false,
			isCurrent: false,
			date: Date.now(),
			bin: day
		};

		if (!Array.isArray(updatedTodos[day])) {
			updatedTodos[day] = []; // If it's the initial todo for the day, an empty array will be generated
		};

		updatedTodos[day] = [newTodo, ...updatedTodos[day]];

		setTodos(updatedTodos);
	};

	// rename todo
	const handleRenameTodo = (bin, id, newTitle) => {
		if (!newTitle || isTodoDuplicate(todos[bin], newTitle)) return;

		const updatedTodos = { ...todos };
		const updatedDailyTodos = updatedTodos[bin].map((todo) => {
			return (todo.id === id) ? { ...todo, title: newTitle } : { ...todo };
		});

		updatedTodos[bin] = updatedDailyTodos;

		setTodos(updatedTodos);
	};

	// remove todo
	const handleRemoveTodo = (bin, id, showNotif = true) => {
		const updatedTodos = { ...todos };

		updatedTodos[bin] = updatedTodos[bin].filter((todo) => todo.id !== id);

		if (updatedTodos[bin].length === 0) {
			delete updatedTodos[bin];
		};

		setTodos(updatedTodos);

		// display notification about todo deletion
		if (showNotif) {
			setTimeout(() => {
				setNotifContent(
					<div className={styles.removeTodoNotif}>
						<span>Removed successfully!</span>

						<button onClick={() => {
							setTodos({ ...todos });
							setTimeout(() => {
								setNotifIsVisible(false);
							}, 200);
						}}>
							<span>Undo</span>
							<FaUndoAlt />
						</button>
					</div>
				);

				setNotifIsVisible(true);
				hideNotifTimeOutRef.current = hideNotifeTimeout(4000);
			}, 600);
		};
	};

	const hideNotifeTimeout = (duration) => {
		return setTimeout(() => {
			setNotifIsVisible(false);
		}, duration);
	};

	// сlearing the timeout on hovering over the notification
	const handleNotifHoverStart = () => {
		clearTimeout(hideNotifTimeOutRef.current);
	};

	// setting a timeout on the 'onHoverEnd' event
	const handleNotifHoverEnd = () => {
		setTimeout(() => {
			setNotifIsVisible(false);
		}, 2000);
	};

	// mark todo as completed/uncompleted
	const handleMarkTodo = (bin, id) => {
		const updatedTodos = { ...todos };

		updatedTodos[bin] = updatedTodos[bin].map((todo) => {
			if (todo.isCurrent) {
				setCurrentTodo(null);
			};

			return (todo.id === id)
				? { ...todo, isCompleted: !todo.isCompleted, isCurrent: todo.isCurrent && false, date: Date.now(), id: uuidv4() }
				: { ...todo };
		});

		handleRemoveTodo(bin, id, false);

		updatedTodos[bin] = sortTodosByCompletion(updatedTodos[bin]);

		setTimeout(() => {
			setTodos(updatedTodos);
		}, 600);
	};

	// mark todo as current
	const handleMarkTodoAsCurrent = (bin, id) => {
		setTodos((prevTodos) => {
			const updatedTodos = { ...prevTodos };

			if (currentTodo && currentTodo.bin !== bin) {
				updatedTodos[currentTodo.bin] = updatedTodos[currentTodo.bin].map((todo) => {
					return (todo.id === currentTodo.id)
						? { ...todo, isCurrent: false }
						: { ...todo };
				});
			};

			updatedTodos[bin] = updatedTodos[bin].map((todo) => {
				return (todo.id === id)
					? { ...todo, isCurrent: !todo.isCurrent }
					: { ...todo, isCurrent: false };
			});

			return updatedTodos;
		})

		setCurrentTodo((prevCurrent) => {
			return (prevCurrent && prevCurrent.id === id)
				? null
				: { ...todos[bin].find((todo) => todo.id === id) };
		});
	};

	// reorder todo
	const handleReorderTodo = (reorderedList, movedTodo) => {
		if (!movedTodo || movedTodo.type === 'dateSeparator' || isIdDuplicate(reorderedList)) return;

		const updatedIndex = reorderedList.indexOf(reorderedList.find((item) => item.id === movedTodo.id));
		const prev = reorderedList[updatedIndex - 1];
		const next = reorderedList[updatedIndex + 1];

		const hasDateSeparatorBelow = !!reorderedList
			.slice(updatedIndex)
			.find((el) => el.type === 'dateSeparator');

		if ((!prev && next.type === 'dateSeparator') || (prev && (prev.isCompleted && (!next || !hasDateSeparatorBelow)))) return;

		let updatedDate = (prev && next && prev.date !== undefined && next.date !== undefined && !next.isCompleted && !prev.isCompleted)
			? (Math.floor((prev.date + next.date) / 2))
			: !prev || prev.date === undefined
				? Date.now() // set the current timestamp if there are no other todos above
				: Math.floor(prev.date / 2); // halfway based on the timestamp of the previous todo if no todos below

		const updatedTodos = { ...todos };
		const isMovedToAnotherDay = prev && (prev.bin !== movedTodo.bin || (prev.isCompleted && next));
		let targetBin = movedTodo.bin;

		if (isMovedToAnotherDay) {
			// remove the todo from its original bin
			updatedTodos[movedTodo.bin] = updatedTodos[movedTodo.bin].filter((todo) => todo.id !== movedTodo.id);

			// if move down
			if (prev.isCompleted && prev.bin === movedTodo.bin) {
				updatedDate = Date.now();

				// find the first date separator bin after the updatedIndex
				targetBin = reorderedList.slice(updatedIndex).find((el) => el.type === 'dateSeparator').bin;
			}
			// if move up
			else if (prev.isCompleted && prev.bin !== movedTodo.bin) {
				const lastUncompletedTodo = reorderedList.find((todo, index, arr) => {
					return todo.bin === prev.bin && todo.type !== 'dateSeparator' && arr[index + 1].isCompleted;
				});

				updatedDate = lastUncompletedTodo ? Math.floor(lastUncompletedTodo.date / 2) : Date.now();

				targetBin = prev.bin;
			}
			else {
				targetBin = prev.bin;
			};

			if (isTodoDuplicate(todos[targetBin], movedTodo.title)) return;

			// add the todo to the target bin
			updatedTodos[targetBin] = [{ ...movedTodo, bin: targetBin, date: updatedDate }, ...updatedTodos[targetBin]];
		} else {
			// update the date of the todo in its original bin
			updatedTodos[movedTodo.bin] = updatedTodos[movedTodo.bin].map((todo) => {
				return todo.id === movedTodo.id ? { ...todo, date: updatedDate } : { ...todo };
			});
		};

		if (isNaN(updatedDate)) return;

		updatedTodos[targetBin] = sortTodosByCompletion(updatedTodos[targetBin]);

		setTodos(updatedTodos);
	};

	const handleToggleLeftSideBar = () => {
		setLeftSideBarIsVisible((state) => !state);
	};

	// toggle modal
	const handleToggleModal = (content) => {
		if (content === null) {
			setModalIsVisible(false);
			setModalContent(null);
			return;
		};

		setModalContent(content);
		setModalIsVisible(true);
	};

	return (
		<div className={styles.todoApp}>
			<div className={styles.content}>
				{/* <h1>DoVibe</h1> */}

				<InputBar
					inputBarRef={inputBarRef}
					onSubmit={handleAddTodo}
				/>

				<FiltersBar
					initialDate={date}
					colorScheme={colorScheme}
					onChangeScheme={handleChangeScheme}
					onChangeViewMode={handleChangeViewMode}
					onToggleLeftSideBar={handleToggleLeftSideBar}
					setOnlyUncompleted={setOnlyUncompleted}

					leftSideBarIsVisible={leftSideBarIsVisible}
					isOnlyUncompleted={isOnlyUncompleted}
				/>

				<TodoList
					list={
						// displaying daily todos; if no date is selected, show all todos
						date ? todos[date] : allTodos
					}
					date={date}
					showCustomModal={handleToggleModal}
					onReorderTodo={handleReorderTodo}
					onRenameTodo={handleRenameTodo}
					onRemoveTodo={handleRemoveTodo}
					onMarkTodo={handleMarkTodo}
					onMarkTodoAsCurrent={handleMarkTodoAsCurrent}
					isOnlyUncompleted={isOnlyUncompleted}
				/>
			</div>

			<AnimatePresence initial={false}>
				{leftSideBarIsVisible && (
					<LeftSideBar
						key={'LeftSideBar'}
						initialDate={date}
						todos={todos}
						currentTodo={currentTodo}
						onPickDate={handleChangeViewMode}
						checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
					/>
				)}

				{modalIsVisible && (
					<Modal
						key={'modal'}
						onClose={() => setModalIsVisible(false)}>
						{modalContent}
					</Modal>
				)}

				{notifIsVisible && (
					<Notification
						key={'notif'}
						onHoverStart={handleNotifHoverStart}
						onHoverEnd={handleNotifHoverEnd}
					>
						{notifContent}
					</Notification>
				)}
			</AnimatePresence>

			<Footer />
		</div>
	);
}

export default TodoApp;