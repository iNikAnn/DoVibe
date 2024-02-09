import styles from '../css/FiltersBar.module.css';

function FiltersBar({ date, setDate, today }) {
	return (
		<div className={styles.filtersWrapper}>
			<div className={`${styles.datePickerWrapper}`}>
				<input
					className={styles.datePicker}
					type="date"
					value={date} onChange={(e) => setDate(e.target.value)}
					name="date"
					id="date"
				/>
			</div>

			<fieldset className={styles.fieldset}>
				<input type="radio" name="range" id="all" onChange={() => setDate('')} checked={!date ? true : false} />
				<label className={styles.label} htmlFor="all" onChange={() => setDate()}>
					<small>All</small>
				</label>

				<input type="radio" name="range" id="oneDay" onChange={() => setDate(today)} checked={date ? true : false} />
				<label className={styles.label} htmlFor="oneDay">
					<small>One day</small>
				</label>

				<span className={styles.separator}>|</span>

				<input type="checkbox" name="" id="uncompletedTodo" />
				<label className={styles.label} htmlFor="uncompletedTodo">
					<small>Only uncompleted</small>
				</label>
			</fieldset>
		</div>
	)
}

export default FiltersBar;