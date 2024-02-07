import styles from '../css/InputBar.module.css';

// react
import { useEffect, useRef, useState } from 'react';

function InputBar({ inputBarRef, date, setDate, onSubmit }) {
	const datePickerWrapperRef = useRef(null);
	const [input, setInput] = useState('');

	// show the picker when changing dates
	useEffect(() => {
		datePickerWrapperRef.current.classList.remove(styles.datePickerWrapperHidden);
	}, [date]);

	const handleChange = (e) => {
		setInput(e.target.value.slice(0, 55)); // restrict input length
		datePickerWrapperRef.current.classList.add(styles.datePickerWrapperHidden); // hide the picker when using the input
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (input) {
			onSubmit(input);
			setInput('');
		};
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
					<div
						ref={datePickerWrapperRef}
						className={`${styles.datePickerWrapper} ${input ? styles.datePickerWrapperHidden : ''}`}
					>
						<input
							className={styles.datePicker}
							type="date"
							value={date} onChange={(e) => setDate(e.target.value)}
							name="date"
							id="date"
						/>
					</div>

					<button className={styles.btn}>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default InputBar;