import styles from '../css/TodoApp.module.css';

// react
import { useEffect, useState } from 'react';

// components
import SearchBar from './SearchBar';
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

		setTodos([...todos, newTodo]);
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
			<SearchBar
				onSubmit={handleAddTodo}
			/>

			<TodoList
				list={todos}
				onRemoveTodo={handleRemoveTodo}
				onMarkTodo={handleMarkTodo}
			/>
		</div>
	);
}

export default TodoApp