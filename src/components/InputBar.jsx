import styles from '../css/InputBar.module.css';

// react, framer
import { useState } from 'react';
import { motion } from 'framer-motion';

// components
import Switcher from './Switcher';
import Filter from './Filter';

// icons
import { HiPencil } from "react-icons/hi2";
import { MdLibraryAdd } from "react-icons/md";
import { FaSun } from "react-icons/fa"; // light mode
import { FaMoon } from "react-icons/fa"; // dark mode
import { BsEmojiLaughingFill } from "react-icons/bs";

function InputBar({ inputBarRef, isMobileVersion, onSubmit, colorScheme, onChangeScheme, addRandomEmoji, onToggleRandomEmoji }) {
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
			y: '-100%'

		},

		animate: {
			opacity: 1,
			height: 'auto',
			y: 0
		},

		exit: {
			opacity: 0,
			height: 0,
			y: 0
		},
	};

	return (
		<motion.div {...inputBarVariants} className={styles.formWrapper}>
			<form
				className={styles.form}
				action="submit"
				onSubmit={(e) => handleSubmit(e)}
			>
				<HiPencil />

				<input
					ref={inputBarRef}
					className={styles.input}
					type="text"
					value={input}
					placeholder="Add a new task"
					onChange={(e) => handleChange(e)}
				/>
				{/* <div className={styles.btnWrapper}> */}
				<button className={styles.createBtn}>
					<span>Create</span>
					<span className={styles.btnIconWrapper}><MdLibraryAdd /></span>
				</button>
				{/* </div> */}
			</form>

			{!isMobileVersion && (
				<div className={styles.inputBarRight}>
					<Filter
						name="addRandomEmoji"
						icon={<BsEmojiLaughingFill />}
						tooltip={`${addRandomEmoji ? 'Disable' : 'Enable'} random emoji at the start`}
						checked={addRandomEmoji}
						onChange={onToggleRandomEmoji}
					/>

					<span className={styles.separator}>|</span>

					<Switcher
						name="colorScheme"
						iconLeft={<FaSun />}
						activeLeftColor='#ffcc66'
						tooltipLeft="Light scheme"
						checkedLeft={colorScheme === 'light'}
						onChangeLeft={() => onChangeScheme('light')}
						iconRight={<FaMoon />}
						activeRightColor='#bb88ff'
						tooltipRight="Dark scheme"
						checkedRight={colorScheme === 'dark'}
						onChangeRight={() => onChangeScheme('dark')}
					/>
				</div>
			)}
		</motion.div>
	);
}

export default InputBar;