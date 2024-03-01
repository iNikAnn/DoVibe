function TodoDetails({ title, desc }) {
	return (
		<div>
			<h3>{title}</h3>

			<p
				style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}
			>
				{desc}
			</p>
		</div>
	);
}

export default TodoDetails;