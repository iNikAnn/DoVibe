import styles from '../css/TodoApp.module.css';

// react, uuid
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// components
import InputBar from './InputBar';
import TodoList from './TodoList';

// utils
import modifyDateByOneDay from '../utils/modifyDateByOneDay';
import isTodoDuplicate from '../utils/isTodoDuplicate';
import sortTodosByCompletion from '../utils/sortTodosByCompletion';

function TodoApp() {
	const today = new Date().toISOString().slice(0, 10);

	const [date, setDate] = useState(today);
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	// change the date by pressing arrow keys
	useEffect(() => {
		const handleChangeDate = (e) => {
			if (e.ctrlKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
				setDate(modifyDateByOneDay(date, e.key));
				document.querySelector('input[type="text"]').focus();
			};
		};

		window.addEventListener('keydown', handleChangeDate);

		return () => window.removeEventListener('keydown', handleChangeDate);
	}, [date]);

	// toggle view mode
	const handleToggleViewMode = () => {
		date ? setDate('') : setDate(today);
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
			updatedTodos[day] = [];
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
			if (todo.id === id) {
				return { ...todo, title: newName };
			} else {
				return { ...todo };
			};
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
			<InputBar onSubmit={handleAddTodo} />

			<div>
				<input type="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" id="date" />

				<button onClick={handleToggleViewMode}>View all</button>
			</div>

			<TodoList
				list={
					date
						? todos[date]
						: Object.values(todos).map((arr) => arr.slice().reverse()).flat().reverse()
				}

				onRenameTodo={handleRenameTodo}
				onRemoveTodo={handleRemoveTodo}
				onMarkTodo={handleMarkTodo}
			/>
		</div>
	);
}

export default TodoApp;