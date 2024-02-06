import styles from '../css/InputBar.module.css';

// react
import { useState } from 'react';

function InputBar({ inputBarRef, onSubmit }) {
	const [input, setInput] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (input) {
			onSubmit(input);
			setInput('');
		};
	};

	return (
		<div>
			<form
				action="submit"
				onSubmit={(e) => handleSubmit(e)}
			>
				<input
					ref={inputBarRef}
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

export default InputBar;