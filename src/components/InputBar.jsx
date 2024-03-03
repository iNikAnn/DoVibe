import styles from '../css/InputBar.module.css';

// react, framer
import { useState } from 'react';
import { motion } from 'framer-motion';

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

	const inputBarVariants = {
		initial: {
			opacity: 0,
			height: 0,

		},

		animate: {
			opacity: 1,
			height: 'auto',
		},

		exit: {
			opacity: 0,
			height: 0,
		},
	};

	return (
		<motion.div {...inputBarVariants} className={styles.formWrapper}>
			<div style={{ paddingTop: '1rem' }}>
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
					<button className={styles.createBtn}>
						<span>Create</span>
						<span className={styles.btnIconWrapper}><MdLibraryAdd /></span>
					</button>
					{/* </div> */}
				</form>
			</div>
		</motion.div>
	);
}

export default InputBar;