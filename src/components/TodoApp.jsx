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
import Notification from './Hotification';

// utils
import getFormattedDate from '../utils/getFormattedDate';
import modifyDateByOneDay from '../utils/modifyDateByOneDay';
import isTodoDuplicate from '../utils/isTodoDuplicate';
import sortTodosByCompletion from '../utils/sortTodosByCompletion';

// icons
import { FaUndoAlt } from "react-icons/fa";
import Modal from './Modal';

function TodoApp() {
	const inputBarRef = useRef(null);
	// const today = new Date().toISOString().slice(0, 10);
	const today = getFormattedDate(new Date());

	const [date, setDate] = useState(today);
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});
	const [isOnlyUncompleted, setOnlyUncompleted] = useState(false);

	// notification
	const [notifIsVisible, setNotifIsVisible] = useState(false);
	const [notifContent, setNotifContent] = useState(null);
	const hideNotifTimeOutRef = useRef(null);

	// modal
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const allTodos = Object.values(todos).map((arr) => arr.slice().reverse()).flat().reverse();

	// save todos to local storage
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	// change the date by pressing comma / period
	useEffect(() => {
		const handleChangeDate = (e) => {
			if (((e.ctrlKey || e.metaKey) && e.shiftKey)
				&& (e.code === 'Comma' || e.code === 'Period')) {
				setDate(modifyDateByOneDay(date, e.code));
			};
		};

		inputBarRef.current.focus(); // highlight the input after loading or changing the date
		window.addEventListener('keydown', handleChangeDate);

		return () => window.removeEventListener('keydown', handleChangeDate);
	}, [date, isOnlyUncompleted]);

	const checkForUnfinishedTodosInDay = (date) => {
		const formattedDate = getFormattedDate(date);

		if (todos[formattedDate]) {
			return Boolean(todos[formattedDate].find((todo) => !todo.isCompleted));
		};

		return false;
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

						<button onClick={() => setTodos({ ...todos })}>
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

	// mars todo as completed/uncompleted
	const handleMarkTodo = (bin, id) => {
		const updatedTodos = { ...todos };
		updatedTodos[bin] = updatedTodos[bin].map((todo) => {
			return (todo.id === id)
				? { ...todo, isCompleted: !todo.isCompleted, date: Date.now() }
				: { ...todo };
		});

		handleRemoveTodo(bin, id, false);

		updatedTodos[bin] = sortTodosByCompletion(updatedTodos[bin]);

		setTimeout(() => {
			setTodos(updatedTodos);
		}, 600);
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
			{/* <h1>DoVibe</h1> */}

			<InputBar
				inputBarRef={inputBarRef}
				onSubmit={handleAddTodo}
			/>

			<FiltersBar
				todos={todos}
				initialDate={date}
				setDate={setDate}
				onChangeViewMode={handleChangeViewMode}
				setOnlyUncompleted={setOnlyUncompleted}
				checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
			/>

			<TodoList
				list={
					// displaying daily todos; if no date is selected, show all todos
					date ? todos[date] : allTodos
				}
				date={date}
				showCustomModal={handleToggleModal}
				onRenameTodo={handleRenameTodo}
				onRemoveTodo={handleRemoveTodo}
				onMarkTodo={handleMarkTodo}
				isOnlyUncompleted={isOnlyUncompleted}
			/>

			<Footer />

			<AnimatePresence>
				{modalIsVisible && (
					<Modal onClose={() => setModalIsVisible(false)}>
						{modalContent}
					</Modal>
				)}

				{notifIsVisible && (
					<Notification
						onHoverStart={handleNotifHoverStart}
						onHoverEnd={handleNotifHoverEnd}
					>
						{notifContent}
					</Notification>
				)}
			</AnimatePresence>
		</div>
	);
}

export default TodoApp;