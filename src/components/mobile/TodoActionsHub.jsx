import styles from '../../css/TodoActionsHub.module.css';

// react, framer
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// components
import Switcher from '../Switcher';

// icons
import { MdAlarmOn } from "react-icons/md";
import { MdAlarmOff } from "react-icons/md";

function TodoActionsHub(props) {
	const {
		bin,
		id,
		title,
		description,

		isCompleted,
		isCurrent,

		onActionFinished,
		onMarkAsCurrent,
		onMark,
		onSetReminder,
		onEdit,
		onRemove,
	} = props;

	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [isRemindersVisible, setIsRemindersVisible] = useState(false);

	const handleCloseSubMenu = () => {
		setIsRemindersVisible(false);
		setIsSubMenuOpen(false);
	};

	const subMenuVariants = {
		initial: {
			opacity: 0,
			height: 0
		},

		animate: {
			opacity: 1,
			height: 'auto'
		},

		exit: {
			opacity: 0,
			height: 0
		},
	};

	return (
		<div className={styles.todoActionsHub}>
			{isSubMenuOpen && (
				<div className={styles.subMenuOverlay} onClick={handleCloseSubMenu} />
			)}

			<ul
				className={`${styles.actionsList} ${isRemindersVisible ? styles.actionsListDimmed : ''}`}
				onClick={(e) => {
					if (e.target.dataset.type === 'actionBtn') {
						onActionFinished();
					};
				}}
			>
				{!isCompleted && (
					<li>
						<button data-type="actionBtn" onClick={() => onMarkAsCurrent(bin, id)}>
							{isCurrent ? 'Unmark as Current' : 'Mark as Current'}
						</button>
					</li>
				)}

				<li>
					<button data-type="actionBtn" onClick={() => onMark(bin, id)}>
						{isCompleted ? 'Uncomplete' : 'Complete'}
					</button>
				</li>

				{!isCompleted && (
					<li className={isRemindersVisible ? styles.liActive : ''}>
						<button
							onClick={() => {
								setIsRemindersVisible((prev) => !prev);
								setIsSubMenuOpen((prev) => !prev);
							}}
						>
							Set reminder
						</button>

						<AnimatePresence>
							{isRemindersVisible && (
								<motion.div {...subMenuVariants}>
									<div className={styles.subMenu}>
										<div className={styles.subMenuItem}>
											<span>On the day</span>

											<Switcher
												name="onTheDay"
												iconLeft={<MdAlarmOff />}
												// activeLeftColor='#ffcc66'
												tooltipLeft="Light scheme"
												// checkedLeft={colorScheme === 'light'}
												// onChangeLeft={() => onChangeScheme('light')}
												iconRight={<MdAlarmOn />}
												activeRightColor='#bb88ff'
												tooltipRight="Dark scheme"
											// checkedRight={colorScheme === 'dark'}
											// onChangeRight={() => onChangeScheme('dark')}
											/>
										</div>

										<div className={styles.subMenuItem}>
											<span>1 day before</span>

											<Switcher
												name="1DayBefore"
												iconLeft={<MdAlarmOff />}
												// activeLeftColor='#ffcc66'
												tooltipLeft="Light scheme"
												// checkedLeft={colorScheme === 'light'}
												// onChangeLeft={() => onChangeScheme('light')}
												iconRight={<MdAlarmOn />}
												activeRightColor='#bb88ff'
												tooltipRight="Dark scheme"
											// checkedRight={colorScheme === 'dark'}
											// onChangeRight={() => onChangeScheme('dark')}
											/>
										</div>

										<div className={styles.subMenuItem}>
											<span>3 day before</span>

											<Switcher
												name="3DayBefore"
												iconLeft={<MdAlarmOff />}
												// activeLeftColor='#ffcc66'
												tooltipLeft="Light scheme"
												// checkedLeft={colorScheme === 'light'}
												// onChangeLeft={() => onChangeScheme('light')}
												iconRight={<MdAlarmOn />}
												activeRightColor='#bb88ff'
												tooltipRight="Dark scheme"
											// checkedRight={colorScheme === 'dark'}
											// onChangeRight={() => onChangeScheme('dark')}
											/>
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</li>
				)}

				{!isCompleted && (
					<li>
						<button data-type="actionBtn" onClick={() => onEdit({ bin, id, title, description })}>
							Edit
						</button>
					</li>
				)}

				<li>
					<button
						data-type="actionBtn"
						onClick={() => onRemove(bin, id)}
						aria-label="Remove todo"
					>
						Remove
					</button>
				</li>
			</ul>
		</div>
	);
}

export default TodoActionsHub;