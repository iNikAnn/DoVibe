import styles from '../css/TodoItem.module.css';

// react, framer
import { Fragment, useEffect, useRef, useState, } from 'react';
import { motion, } from 'framer-motion';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ index, title, id, bin, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo }) {
	const todoRef = useRef(null);
	const [delay, setDelay] = useState(false);

	const handleRemove = () => {
		setDelay(true);
		onRemoveTodo(bin, id);
	};

	const handleMark = () => {
		setDelay(true);
		onMarkTodo(bin, id);
	};

	const liVariants = {
		initial: {
			y: '-2rem',
			opacity: 0,
			maxHeight: 0,
		},

		animate: (custom) => ({
			y: 0,
			opacity: 1,
			maxHeight: '3rem',
			transform: 'scale(1)',

			transition: {
				ease: 'easeOut',
				delay: custom * (delay ? 0 : .1),
				duration: .3
			}
		}),

		exit: {
			opacity: 0,
			maxHeight: 0,
			transform: `scale(${delay ? .9 : 1})`,

			transition: {
				ease: 'easeOut',
				duration: .3,
				maxHeight: { delay: delay ? .3 : 0 }
			}
		}
	};

	return (
		<>
			<motion.li
				key={title}
				{...liVariants}
				custom={index}
			>
				<div ref={todoRef} data-id={id} className={`${styles.todoItemWrapper}`}>
					<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
						<span className={styles.text}>{title}</span>
					</div>

					<div className={styles.btnWrapper}>
						<button title="Rename" className={styles.btnRename} onClick={() => onRenameTodo(bin, id, title)}><HiMiniPencilSquare /></button>
						<button title='Remove' className={styles.btnRemove} onClick={handleRemove}><FaTrash /></button>
						<button title='Toggle Todo Status' className={styles.btnMark} onClick={handleMark}><FaCheck /></button>
					</div>
				</div>
			</motion.li>
		</>

	);
}

export default TodoItem;