import styles from '../css/TodoDetails.module.css';
import Linkify from "linkify-react";

// components
import TextBadge from './TextBadge';

function TodoDetails({ title, desc, bin, isCompleted }) {
	return (
		<div className={styles.todoDetails}>
			<div className={styles.info}>
				<TextBadge
					text={<span><strong>Date:</strong> {bin}</span>}
				/>

				<TextBadge
					text={<span><strong>Status:</strong> {isCompleted ? 'completed' : 'uncompleted'}</span>}
				/>
			</div>

			<div className={styles.details}>
				<h3>{title}</h3>
				<p style={{ whiteSpace: 'pre-line' }}>
					<Linkify options={{ target: '_black' }}>
						{desc}
					</Linkify>
				</p>
			</div>
		</div>
	)
}

export default TodoDetails;