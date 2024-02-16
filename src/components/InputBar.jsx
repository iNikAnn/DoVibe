import styles from '../css/InputBar.module.css';

// react
import { useState } from 'react';

// icons
import { MdLibraryAdd } from "react-icons/md";

function InputBar({ inputBarRef, onSubmit }) {
	const [input, setInput] = useState('');


	const handleChange = (e) => {
		setInput(e.target.value);
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

				{/* <div className={styles.btnWrapper}> */}
				<button className={styles.btn}>
					<span>Create</span>
					<span className={styles.btnIconWrapper}><MdLibraryAdd /></span>
				</button>
				{/* </div> */}
			</form>
		</div>
	);
}

export default InputBar;