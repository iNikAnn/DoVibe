import styles from '../../css/TodoActionsHub.module.css';

// react, framer
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// components
import Filter from '../Filter';

// icons
import { IoAlarm } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

function TodoActionsHub(props) {
	const {
		bin,
		id,
		title,
		description,

		isCompleted,
		isCurrent,
		reminders,

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

	const daysUntilToday = () => {
		const todoDate = new Date(bin);
		todoDate.setHours(0, 0, 0, 0);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const differenceInTime = todoDate.getTime() - today.getTime();
		const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

		return differenceInDays;
	};

	const reminderStatus = (reminderName) => {
		return reminders?.find((reminder) => reminder.name === reminderName);
	}

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

				{(!isCompleted && !(daysUntilToday() <= 0)) && (
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
											<span style={{ textAlign: 'left' }}>
												On the day<br />
												<small className={styles.reminderStatusMsg}>
													{reminderStatus('onTheDay') ? 'Enabled' : 'Disabled'}
												</small>
											</span>

											<Filter
												name="onTheDay"
												icon={<IoAlarm />}
												checked={reminderStatus('onTheDay')}
												onChange={(boolean) => onSetReminder(bin, id, 'onTheDay', boolean)}
											/>
										</div>

										{daysUntilToday() >= 2 && (
											<div className={styles.subMenuItem}>
												<span style={{ textAlign: 'left' }}>
													1 day before<br />
													<small className={styles.reminderStatusMsg}>
														{reminderStatus('1DayBefore') ? 'Enabled' : 'Disabled'}
													</small>
												</span>

												<Filter
													name="1DayBefore"
													icon={<IoAlarm />}
													checked={reminderStatus('1DayBefore')}
													onChange={(boolean) => onSetReminder(bin, id, '1DayBefore', boolean)}
												/>
											</div>
										)}

										{daysUntilToday() >= 4 && (
											<div className={styles.subMenuItem}>
												<span style={{ textAlign: 'left' }}>
													3 day before<br />
													<small className={styles.reminderStatusMsg}>
														{reminderStatus('3DayBefore') ? 'Enabled' : 'Disabled'}
													</small>
												</span>

												<Filter
													name="3DayBefore"
													icon={<IoAlarm />}
													checked={reminderStatus('3DayBefore')}
													onChange={(boolean) => onSetReminder(bin, id, '3DayBefore', boolean)}
												/>
											</div>
										)}

										<small className={styles.remindersDesc}>
											The notification will arrive at 8 AM.
										</small>
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
						className={isSubMenuOpen ? '' : styles.colored}
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