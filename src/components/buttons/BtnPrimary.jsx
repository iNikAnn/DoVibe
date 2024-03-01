import styles from '../../css/BtnPrimary.module.css';

function BtnPrimary({ text, title, icon, onClick }) {
	return (
		<button
			className={styles.btn}
			onClick={onClick}
			title={title}
		>
			{text}
			{icon}
		</button>
	);
}

export default BtnPrimary;