import styles from '../../css/MobileHeader.module.css';

function MobileHeader({ date }) {
	const viewMode = new Date(date).toLocaleDateString();

	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<span className={styles.logo} />
				<h2>DoVibe</h2>
			</div>

			<span>{date ? viewMode : 'All todos'}</span>
		</header>
	);
}

export default MobileHeader;