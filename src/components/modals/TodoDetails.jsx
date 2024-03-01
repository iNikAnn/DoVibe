import styles from '../../css/TodoDetails.module.css';
import Linkify from 'linkify-react';

function TodoDetails({ title, desc }) {
	return (
		<div className={styles.todoDetails}>
			<h3>{title}</h3>

			<p
				style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}
			>
				<Linkify options={{ target: '_blank' }}>
					{desc}
				</Linkify>
			</p>
		</div>
	);
}

export default TodoDetails;