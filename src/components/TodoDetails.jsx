import styles from '../css/TodoDetails.module.css';
import Linkify from "linkify-react";

// components
import TextBadge from './TextBadge';

function TodoDetails({ title, desc, bin, isCompleted }) {
	return (
		<div className={styles.todoDetails}>
			<div className={styles.separator} />

			<div className={styles.info}>
				<TextBadge
					text={<span><strong>Date:</strong> {bin}</span>}
				/>

				<TextBadge
					text={<span><strong>Status:</strong> {isCompleted ? 'completed' : 'uncompleted'}</span>}
				/>
			</div>


			<div className={styles.details}>
				<div className={styles.separator} />

				<div className={styles.titleWrapper}>
					<h3>{title}</h3>
				</div>

				<div className={styles.separator} />

				<p className={styles.desc}>
					<Linkify options={{ target: '_black' }}>
						{desc}
					</Linkify>
				</p>
			</div>
		</div>
	)
}

export default TodoDetails;