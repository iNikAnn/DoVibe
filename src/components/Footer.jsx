import styles from '../css/Footer.module.css';

import packageJson from '../../package.json';

function Footer() {
	const version = packageJson.version;
	const homePage = packageJson.homepage;

	return (
		<footer className={styles.footer}>
			<small>
				DoVibe on <a className={styles.link} href={homePage} target="_blank" rel="noreferrer">GitHub</a>
			</small>

			<small>Version: {version}</small>
		</footer>
	);
}

export default Footer;