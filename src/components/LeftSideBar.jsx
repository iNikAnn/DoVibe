import styles from '../css/LeftSideBar.module.css';

// react, framer
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// components
import DatePicker from './datepicker/DatePicker';
import CurrentTodo from './CurrentTodo';
import BtnPrimary from './buttons/BtnPrimary';

// icons
import { MdGetApp } from "react-icons/md";

function LeftSideBar({ initialDate, todos, currentTodo, onPickDate, checkForUnfinishedTodosInDay }) {
	const [installPwaBtnIsVisible, setInstallPwaBtnIsVisible] = useState(false);

	// show or hide install PWA button
	useEffect(() => {
		const checkIsInstalledPwa = () => {
			if (window.matchMedia('(display-mode: standalone)').matches) {
				setInstallPwaBtnIsVisible(false);
			} else {
				setInstallPwaBtnIsVisible(true);
			};
		};

		checkIsInstalledPwa();
	}, []);

	// handle install app as PWA
	const [installPrompt, setInstallPrompt] = useState(null);

	useEffect(() => {
		const beforeInstall = (event) => {
			setInstallPrompt(event);
		};

		window.addEventListener('beforeinstallprompt', beforeInstall);

		return () => window.removeEventListener('beforeinstallprompt', beforeInstall);
	}, []);

	const handleInstallPwa = async () => {
		if (installPrompt) {
			const result = await installPrompt.prompt();
		};
	};

	const barVariants = {
		initial: {
			opacity: 0,
			width: 0,
			transform: 'translateX(-2rem)',
		},

		animate: {
			opacity: 1,
			// width: 'auto',
			width: 'calc(2rem * 7 + 1.2rem + 1rem)', // set the width based on the calendar cell size, padding, and left bar padding
			transform: 'translateX(0)',

			transition: {
				ease: 'easeInOut',
				duration: .3,
				opacity: { delay: .3 },
				transform: { delay: .3 }
			}
		},

		exit: {
			opacity: 0,
			width: 0,
			transform: 'translateX(-2rem)',

			transition: {
				ease: 'easeInOut',
				duration: .3,

				width: { delay: .3 }
			}
		},
	};

	return (
		<motion.section
			{...barVariants}
			className={styles.leftSideBar}
		>
			<div className={styles.content}>
				<AnimatePresence initial={false}>
					{currentTodo && (
						<CurrentTodo
							key="currentTodo"
							title={currentTodo.title}
						/>
					)}
				</AnimatePresence>

				<DatePicker
					todos={todos}
					initialDate={initialDate}
					onPickDate={onPickDate}
					checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
				/>


				{installPwaBtnIsVisible && (
					<div style={{ display: 'grid', marginTop: '1rem' }}>
						<BtnPrimary
							text="Install DoVibe as App"
							icon={<MdGetApp />}
							onClick={handleInstallPwa}
						/>
					</div>
				)}
			</div>
		</motion.section>
	);
}

export default LeftSideBar;