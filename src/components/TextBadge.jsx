import styles from '../css/TextBadge.module.css';

function TextBadge({ text }) {
	return (
		<div className={styles.textBadge}>
			{text}
		</div>
	);
}

export default TextBadge;