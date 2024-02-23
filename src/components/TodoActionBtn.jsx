import styles from '../css/TodoActionBtn.module.css';

function TodoActionBtn({ title, icon, iconColor, onClick }) {
	return (
		<button
			style={{ color: iconColor }}
			className={styles.btn}
			title={title}
			onClick={onClick}
			aria-label={title}
		>
			{icon}
		</button>
	);
}

export default TodoActionBtn;