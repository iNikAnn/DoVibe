import styles from '../css/TodoApp.module.css';

// react, uuid
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// components
import InputBar from './InputBar';
import TodoList from './TodoList';
import Footer from './Footer';

// utils
import modifyDateByOneDay from '../utils/modifyDateByOneDay';
import isTodoDuplicate from '../utils/isTodoDuplicate';
import sortTodosByCompletion from '../utils/sortTodosByCompletion';
import FiltersBar from './FiltersBar';

function TodoApp() {
	const inputBarRef = useRef(null);
	const today = new Date().toISOString().slice(0, 10);

	const [date, setDate] = useState(today);
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});
	const [switchPage, setSwitchPage] = useState(false);
	const [isOnlyUncompleted, setOnlyUncompleted] = useState(false);

	const allTodos = Object.values(todos).map((arr) => arr.slice().reverse()).flat().reverse();

	// save todos to local storage
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	// change the date by pressing arrow keys
	useEffect(() => {
		const handleChangeDate = (e) => {
			if (e.ctrlKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
				// setPrevTodos(todos[date]);

				// setTimeout(() => {
				setDate(modifyDateByOneDay(date, e.key));
				// }, 600);
			};
		};

		inputBarRef.current.focus(); // highlight the input after loading or changing the date
		window.addEventListener('keydown', handleChangeDate);

		return () => window.removeEventListener('keydown', handleChangeDate);
	}, [date, isOnlyUncompleted]);

	// change view mode
	const handleChangeViewMode = (day) => {
		setSwitchPage(true);

		setTimeout(() => {
			setSwitchPage(false);
			setDate(day ? today : '');
		}, 600);
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
	const handleRenameTodo = (bin, id, title) => {
		const newName = prompt('New title...', title);

		if (!newName || isTodoDuplicate(todos[bin], newName)) return;

		const updatedTodos = { ...todos };
		const updatedDailyTodos = updatedTodos[bin].map((todo) => {
			return (todo.id === id) ? { ...todo, title: newName } : { ...todo };
		});

		updatedTodos[bin] = updatedDailyTodos;

		setTodos(updatedTodos);
	};

	// remove todo
	const handleRemoveTodo = (bin, id) => {
		const updatedTodos = { ...todos };
		updatedTodos[bin] = updatedTodos[bin].filter((todo) => todo.id !== id);

		if (updatedTodos[bin].length === 0) delete updatedTodos[bin];

		setTodos(updatedTodos);
	};

	// mars todo as completed/uncompleted
	const handleMarkTodo = (bin, id) => {
		const updatedTodos = { ...todos };

		updatedTodos[bin] = updatedTodos[bin].map((todo) => {
			return (todo.id === id)
				? { ...todo, isCompleted: !todo.isCompleted, date: new Date() }
				: { ...todo };
		});

		updatedTodos[bin] = sortTodosByCompletion(updatedTodos[bin]);

		setTodos(updatedTodos);
	};

	return (
		<div className={styles.todoApp}>
			<h1>DoVibe</h1>

			<InputBar
				inputBarRef={inputBarRef}
				onSubmit={handleAddTodo}
			/>

			<FiltersBar
				initialDate={date}
				setDate={setDate}
				onChangeViewMode={handleChangeViewMode}
				setOnlyUncompleted={setOnlyUncompleted}
			/>

			<TodoList
				list={
					// displaying daily todos; if no date is selected, show all todos
					date ? todos[date] : allTodos
				}
				date={date}
				onRenameTodo={handleRenameTodo}
				onRemoveTodo={handleRemoveTodo}
				onMarkTodo={handleMarkTodo}
				isOnlyUncompleted={isOnlyUncompleted}
				switchPage={switchPage}
			/>

			<Footer />
		</div>
	);
}

export default TodoApp;