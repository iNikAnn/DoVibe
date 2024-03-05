import styles from '../../css/TodoActionsHub.module.css';

function TodoActionsHub(props) {
	const {
		title,

		onActionFinished,
		onMarkAsCurrent,
		onMark,
		onEdit,
		onRemove,
	} = props;

	return (
		<div className={styles.todoActionsHub}>
			<h3 className={styles.title}>
				{title.length > 30 ? title.slice(0, 27).trim() + '...' : title}
			</h3>

			<ul className={styles.actionsList} onClick={onActionFinished}>
				<li>
					<button onClick={onMarkAsCurrent}>
						Mark as current
					</button>
				</li>

				<li>
					<button onClick={onMark}>
						Complete
					</button>
				</li>

				<li>
					<button onClick={onEdit}>
						Edit
					</button>
				</li>

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