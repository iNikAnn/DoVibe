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

	const handleChange = (e) => {
		setInput(e.target.value.slice(0, 45)); // Restrict input length
	};

	return (
		<div>
			<form
				className={styles.form}
				action="submit"
				onSubmit={(e) => handleSubmit(e)}
			>
				<input
					ref={inputBarRef}
					className={styles.input}
					type="text"
					value={input}
					placeholder="Add a new task.."
					onChange={(e) => handleChange(e)}
				/>

				<div className={styles.btnWrapper}>
					<button className={styles.btn}>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default InputBar;