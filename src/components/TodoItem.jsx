import styles from '../css/TodoItem.module.css';

// react, transition-group
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

// icons
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

function TodoItem({ index, title, id, bin, isCompleted, onRenameTodo, onRemoveTodo, onMarkTodo }) {
	const todoRef = useRef(null);
	const [anim, setAnim] = useState(false);
	const animationDuration = 600;

	useEffect(() => {
		setTimeout(() => {
			setAnim(true);
		}, index * 100);
	}, []);

	const handleRemove = () => {
		setAnim(false);

		setTimeout(() => {
			onRemoveTodo(bin, id);
		}, animationDuration);
	};

	const handleMark = () => {
		setAnim(false);

		setTimeout(() => {
			setAnim(true);
			onMarkTodo(bin, id);
		}, animationDuration);
	};

	return (
		<Transition
			in={anim}
			timeout={animationDuration}
		>
			{(state) => (
				<li data-id={id} ref={todoRef} className={`${styles.todoItemWrapper} ${styles[state]}`}>
					<div className={`${styles.todoItem} ${isCompleted ? styles.isCompleted : ''}`}>
						<span className={styles.text}>{title}</span>
					</div>

					<div className={styles.btnWrapper}>
						<button title="Rename" className={styles.btnRename} onClick={() => onRenameTodo(bin, id, title)}><HiMiniPencilSquare /></button>
						<button title='Remove' className={styles.btnRemove} onClick={handleRemove}><FaTrash /></button>
						<button title='Toggle Todo Status' className={styles.btnMark} onClick={handleMark}><FaCheck /></button>
					</div>
				</li>
			)}
		</Transition>
	);
}

export default TodoItem;