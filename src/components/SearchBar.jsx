import styles from '../css/SearchBar.module.css';

// react
import { useState } from 'react';

function SearchBar({ onSubmit }) {
	const [input, setInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(input);
		setInput('');
	};

	return (
		<div>
			<form
				action="submit"
				onSubmit={(e) => handleSubmit(e)}
			>
				<input
					className={styles.input}
					type="text"
					value={input}
					placeholder="Add a new task.."
					onChange={(e) => setInput(e.target.value)}
				/>
			</form>
		</div>
	);
}

export default SearchBar;