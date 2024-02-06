import styles from '../css/InputBar.module.css';

// react
import { useState } from 'react';

function InputBar({ inputBarRef, date, setDate, onSubmit }) {
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
		<div className={styles.formWrapper}>
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

				<div>


					{/* <button onClick={handleToggleViewMode}>View all</button> */}
				</div>

				<div className={styles.btnWrapper}>
					<input
						className={`${styles.calendar} ${input ? styles.calendarHidden : ''}`}
						type="date"
						value={date} onChange={(e) => setDate(e.target.value)}
						title="Selecting the date for a new todo"
						name="date"
						id="date"
					/>

					<button className={styles.btn}>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default InputBar;