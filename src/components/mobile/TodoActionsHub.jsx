import styles from '../../css/TodoActionsHub.module.css';

function TodoActionsHub(props) {
	const {
		title,

		isCompleted,
		isCurrent,

		onActionFinished,
		onMarkAsCurrent,
		onMark,
		onSetReminder,
		onEdit,
		onRemove,
	} = props;

	return (
		<div className={styles.todoActionsHub}>
			<h2 className={styles.title}>
				{title.length > 35 ? title.slice(0, 35).trim() + '...' : title}
			</h2>

			<ul className={styles.actionsList} onClick={onActionFinished}>
				{!isCompleted && (
					<li>
						<button onClick={onMarkAsCurrent}>
							{isCurrent ? 'Unmark as Current' : 'Mark as Current'}
						</button>
					</li>
				)}

				<li>
					<button onClick={onMark}>
						{isCompleted ? 'Uncomplete' : 'Complete'}
					</button>
				</li>

				<li>
					<button onClick={onSetReminder}>
						Set reminder
					</button>
				</li>

				{!isCompleted && (
					<li>
						<button onClick={onEdit}>
							Edit
						</button>
					</li>
				)}

				<li>
					<button style={{ color: '#e4717a' }} onClick={onRemove} >
						Remove
					</button>
				</li>
			</ul>
		</div>
	);
}

export default TodoActionsHub;