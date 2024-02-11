import styles from '../css/TodoItem.module.css';

// react, framer
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ index, title, id, bin, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo, isOnlyUncompleted, date }) {
	const todoRef = useRef(null);

	const handleRemove = () => {
		onRemoveTodo(bin, id);
	};

	const handleMark = () => {
		onMarkTodo(bin, id);
	};

	const liVariants = {
		from: {
			opacity: 0,
			height: 0,
		},

		to: (custom) => ({
			opacity: 1,
			height: '3rem',
			transition: {
				delay: custom * 0.5
			}
		})
	};

	return (
		<motion.li
			ref={todoRef}
			data-id={id}
			className={`${styles.todoItemWrapper}`}

			variants={liVariants}
			initial='from'
			animate='to'
			custom={index}
		>
			<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
				<span className={styles.text}>{title}</span>
			</div>

			<div className={styles.btnWrapper}>
				<button title="Rename" className={styles.btnRename} onClick={() => onRenameTodo(bin, id, title)}><HiMiniPencilSquare /></button>
				<button title='Remove' className={styles.btnRemove} onClick={handleRemove}><FaTrash /></button>
				<button title='Toggle Todo Status' className={styles.btnMark} onClick={handleMark}><FaCheck /></button>
			</div>
		</motion.li>
	);
}

export default TodoItem;