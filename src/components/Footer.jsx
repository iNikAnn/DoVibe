import styles from '../css/Footer.module.css';

function Footer() {
	return (
		<footer className={styles.footer}>
			<small>
				DoVibe on <a className={styles.link} href="https://github.com/iNikAnn/DoVibe" target="_blank">GitHub</a>
			</small>
		</footer>
	);
}

export default Footer;