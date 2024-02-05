import styles from '../css/TodoApp.module.css';

// react
import { useEffect, useState } from 'react';

// components
import InputBar from './InputBar';
import TodoList from './TodoList';

function TodoApp() {
	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

	useEffect(() => {
		if (todos.length > 0) {
			localStorage.setItem('todos', JSON.stringify(todos));
		} else {
			localStorage.removeItem('todos');
		};
	}, [todos]);

	const handleAddTodo = (input) => {
		const newTodo = {
			title: input,
			id: Math.floor((Math.random() * 999999)),
			isCompleted: false,
		};

		setTodos([newTodo, ...todos]);
	};

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

	const handleRemoveTodo = (id) => {
		setTodos(todos.slice().filter((todo) => todo.id !== id));
	};

	const handleMarkTodo = (id) => {
		setTodos(todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, isCompleted: !todo.isCompleted };
			} else {
				return { ...todo };
			};
		}));
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