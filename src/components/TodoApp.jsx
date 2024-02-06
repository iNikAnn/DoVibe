import styles from '../css/TodoApp.module.css';

// react, uuid
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// components
import InputBar from './InputBar';
import TodoList from './TodoList';

// utils
import isTodoDuplicate from '../utils/isTodoDuplicate';
import sortTodosByCompletion from '../utils/sortTodosByCompletion';

function TodoApp() {
	const today = new Date().toISOString().slice(0, 10);

	const [date, setDate] = useState(today);
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || {});

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	// add todo
	const handleAddTodo = (input) => {
		if (isTodoDuplicate(todos[date], input) || !date) return;

		const updatedTodos = { ...todos };
		const newTodo = {
			title: input,
			id: uuidv4(),
			isCompleted: false,
			date: Date.now()
		};

		if (!Array.isArray(updatedTodos[date])) {
			updatedTodos[date] = [];
		};

		updatedTodos[date] = [newTodo, ...updatedTodos[date]];

		setTodos(updatedTodos);
	};

	// rename todo
	const handleRenameTodo = (id, title) => {
		const newName = prompt('New title...', title);

		if (!newName || isTodoDuplicate(todos[date], newName)) return;

		const updatedTodos = { ...todos };
		const updatedDailyTodos = updatedTodos[date].map((todo) => {
			if (todo.id === id) {
				return { ...todo, title: newName };
			} else {
				return { ...todo };
			};
		});

		updatedTodos[date] = updatedDailyTodos;

		setTodos(updatedTodos);
	};

	// remove todo
	const handleRemoveTodo = (id) => {
		const updatedTodos = { ...todos };
		updatedTodos[date] = updatedTodos[date].filter((todo) => todo.id !== id);

		if (updatedTodos[date].length === 0) {
			delete updatedTodos[date];
		};

		setTodos(updatedTodos);
	};

	// mars todo as completed/uncompleted
	const handleMarkTodo = (id) => {
		const updatedTodos = { ...todos };

		updatedTodos[date] = updatedTodos[date].map((todo) => {
			return (todo.id === id)
				? { ...todo, isCompleted: !todo.isCompleted, date: Date.now() }
				: { ...todo };
		});

		// if (!isCompleted) {
		// 	updatedTodos[date] = sortTodosByCompletion(updatedTodos[date]);
		// } else {
		// 	updatedTodos[date] = [
		// 		{ title, id, isCompleted: false },
		// 		...updatedTodos[date].filter((todo) => todo.id !== id)
		// 	];
		// };

		updatedTodos[date] = sortTodosByCompletion(updatedTodos[date]);

		setTodos(updatedTodos);
	};

	return (
		<div className={styles.todoApp}>
			<InputBar
				onSubmit={handleAddTodo}
			/>

			<input type="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" id="date" />

			<TodoList
				// list={date ? todos[date] : Object.values(todos).map((todos) => todos.reverse()).flat().reverse()}
				list={date ? todos[date] : sortTodosByCompletion(Object.values(todos).flat())}
				onRenameTodo={handleRenameTodo}
				onRemoveTodo={handleRemoveTodo}
				onMarkTodo={handleMarkTodo}
			/>
		</div>
	);
}

export default TodoApp