import styles from '../css/TodoDetails.module.css';
import Linkify from "linkify-react";


function TodoDetails({ title, desc }) {
	return (
		<div className={styles.todoDetails}>
			<h3>{title}</h3>
			<p style={{ whiteSpace: 'pre-line' }}>
				<Linkify options={{ target: '_black' }}>
					{desc}
				</Linkify>
			</p>
		</div>
	)
}

export default TodoDetails;