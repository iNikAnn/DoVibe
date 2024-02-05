import styles from '../css/TodoApp.module.css';

// react
import { useEffect, useState } from 'react';

// components
import InputBar from './InputBar';
import TodoList from './TodoList';

// utils
import sortTodosByCompletion from '../utils/sortTodosByCompletion';

function TodoApp() {
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

	useEffect(() => {
		if (todos.length > 0) {
			localStorage.setItem('todos', JSON.stringify(todos));
		} else {
			localStorage.removeItem('todos');
		};
	}, [todos]);

	// add todo
	const handleAddTodo = (input) => {
		const newTodo = {
			title: input,
			id: Math.floor((Math.random() * 999999)),
			isCompleted: false,
		};

		setTodos([newTodo, ...todos]);
	};

	// rename todo
	const handleRenameTodo = (id, title) => {
		const newName = prompt('New title...', title);

		if (!newName) return;

		setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, title: newName };
			} else {
				return { ...todo };
			};
		}));
	};

	// remove todo
	const handleRemoveTodo = (id) => {
		setTodos(todos.slice().filter((todo) => todo.id !== id));
	};

	// mars todo as completed/uncompleted
	const handleMarkTodo = (id, isCompleted, title) => {
		let updatedTodos = todos.map((todo) => {
			return (todo.id === id) ? { ...todo, isCompleted: !isCompleted } : { ...todo };
		});

		if (!isCompleted) {
			updatedTodos = sortTodosByCompletion(updatedTodos);
		} else {
			updatedTodos = [
				{ title, id, isCompleted: false },
				...updatedTodos.filter((todo) => todo.id !== id)
			];
		};

		setTodos(updatedTodos);
	};

	return (
		<div className={styles.todoApp}>
			<InputBar
				onSubmit={handleAddTodo}
			/>

			<TodoList
				list={todos}
				onRenameTodo={handleRenameTodo}
				onRemoveTodo={handleRemoveTodo}
				onMarkTodo={handleMarkTodo}
			/>
		</div>
	);
}

export default TodoApp