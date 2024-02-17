import styles from '../css/TodoItem.module.css';

// react, framer
import { useRef, useState, } from 'react';
import { motion, } from 'framer-motion';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ index, title, id, bin, isCompleted, showCustomModal, onRenameTodo, onRemoveTodo, onMarkTodo }) {
	const todoRef = useRef(null);
	const [delay, setDelay] = useState(false);
	const [motionOn, setMotionOn] = useState(true);

	const handleRename = () => {
		setMotionOn(false);

		showCustomModal(
			<form
				action="submit"
				onSubmit={(e) => {
					e.preventDefault();
					onRenameTodo(bin, id, e.target.newTitle.value);
					showCustomModal(null);
					setMotionOn(true);
				}}
			>
				<h3>Enter new title</h3>
				<input type="text" name="newTitle" id="newTitle" defaultValue={title} autoFocus />
				<div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
					<button style={{ flex: 1 }} data-type="cancel">Cancel</button>
					<button style={{ flex: 1 }} type="submit">Rename</button>
				</div>
			</form>
		)
	};

	const handleRemove = () => {
		setDelay(true);
		onRemoveTodo(bin, id);
	};

	const handleMark = () => {
		setDelay(true);
		onMarkTodo(bin, id);
	};

	const itemVariants = {
		initial: {
			opacity: 0,
			height: 0,
			transform: 'translateY(-2rem) scale(1)',
		},

		animate: (custom) => ({
			opacity: 1,
			height: 'auto',
			transform: 'translateY(0) scale(1)',

			transition: {
				ease: 'easeOut',
				delay: custom * (delay ? 0 : .1),
				duration: .3
			}
		}),

		exit: {
			opacity: 0,
			height: 0,
			transform: `translateY(0) scale(${delay ? .9 : 1})`,

			transition: {
				ease: 'easeOut',
				duration: .3,
				height: { delay: delay ? .3 : 0 }
			}
		}
	};

	return (
		<>
			<motion.li
				{...(motionOn ? itemVariants : {})}
				custom={index}
			>
				<div ref={todoRef} data-id={id} className={`${styles.todoItemWrapper}`}>
					<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
						<span className={styles.text}>{title}</span>
					</div>

					<div className={styles.btnWrapper}>
						<button title="Rename" className={styles.btnRename} onClick={handleRename}><HiMiniPencilSquare /></button>
						<button title='Remove' className={styles.btnRemove} onClick={handleRemove}><FaTrash /></button>
						<button title='Toggle Todo Status' className={styles.btnMark} onClick={handleMark}><FaCheck /></button>
					</div>
				</div>
			</motion.li>
		</>
	);
}

export default TodoItem;