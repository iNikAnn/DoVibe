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
											<span>On the day</span>

											<Switcher
												name="onTheDay"
												// iconLeft={<MdAlarmOff />}
												activeLeftColor='#e4717a'
												tooltipLeft="Light scheme"
												checkedLeft={!reminders?.find((reminder) => reminder.name === 'onTheDay')}
												onChangeLeft={() => onSetReminder(bin, id, 'onTheDay', false)}
												iconRight={<MdAlarmOn />}
												activeRightColor='#7fc7ff'
												tooltipRight="Dark scheme"
												checkedRight={reminders?.find((reminder) => reminder.name === 'onTheDay') || false}
												onChangeRight={() => onSetReminder(bin, id, 'onTheDay', true)}
											/>
										</div>

										{daysUntilToday() >= 2 && (
											<div className={styles.subMenuItem}>
												<span>1 day before</span>

												<Switcher
													name="1DayBefore"
													// iconLeft={<MdAlarmOff />}
													activeLeftColor='#e4717a'
													tooltipLeft="Light scheme"
													checkedLeft={!reminders?.find((reminder) => reminder.name === '1DayBefore')}
													onChangeLeft={() => onSetReminder(bin, id, '1DayBefore', false)}
													iconRight={<MdAlarmOn />}
													activeRightColor='#7fc7ff'
													tooltipRight="Dark scheme"
													checkedRight={reminders?.find((reminder) => reminder.name === '1DayBefore')}
													onChangeRight={() => onSetReminder(bin, id, '1DayBefore', true)}
												/>
											</div>
										)}

										{daysUntilToday() >= 4 && (
											<div className={styles.subMenuItem}>
												<span>3 day before</span>

												<Switcher
													name="3DayBefore"
													// iconLeft={<MdAlarmOff />}
													activeLeftColor='#e4717a'
													tooltipLeft="Light scheme"
													checkedLeft={!reminders?.find((reminder) => reminder.name === '3DayBefore')}
													onChangeLeft={() => onSetReminder(bin, id, '3DayBefore', false)}
													iconRight={<MdAlarmOn />}
													activeRightColor='#7fc7ff'
													tooltipRight="Dark scheme"
													checkedRight={reminders?.find((reminder) => reminder.name === '3DayBefore')}
													onChangeRight={() => onSetReminder(bin, id, '3DayBefore', true)}
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