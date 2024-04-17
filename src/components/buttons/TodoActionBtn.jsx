import styles from '../../css/TodoActionBtn.module.css';

function TodoActionBtn({ title, icon, iconColor, iconColorOnHover, onClick }) {
	return (
		<button
			style={{ color: iconColor }}
			className={`${styles.btn} ${iconColorOnHover ? styles['iconColor' + iconColorOnHover] : ''}`}
			title={title}
			onClick={onClick}
			aria-label={title}
		>
			{icon}
		</button>
	);
}

export default TodoActionBtn;