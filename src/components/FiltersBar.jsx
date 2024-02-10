import styles from '../css/FiltersBar.module.css';

function FiltersBar({ initialDate, onChangeViewMode, setOnlyUncompleted }) {
	return (
		<div className={styles.filtersWrapper}>
			<div className={`${styles.datePickerWrapper}`}>
				<input
					className={styles.datePicker}
					type="date"
					value={initialDate}
					onChange={(e) => onChangeViewMode(e.target.value)}
					name="date"
					id="date"
				/>
			</div>

			<fieldset className={styles.fieldset}>
				<input
					type="radio"
					name="range"
					id="all"
					onChange={() => onChangeViewMode('')}
					checked={initialDate ? false : true}

				/>
				<label className={styles.label} htmlFor="all" title="Show all todos">
					<small>All</small>
				</label>

				<input
					type="radio"
					name="range"
					id="oneDay"
					onChange={() => onChangeViewMode('today')}
					checked={initialDate ? true : false}
				/>
				<label className={styles.label} htmlFor="oneDay" title="Show todos for the day">
					<small>Day</small>
				</label>

				<span className={styles.separator}>|</span>

				<input
					type="checkbox"
					name=""
					id="uncompletedTodo"
					onChange={(e) => setOnlyUncompleted(e.target.checked)}
				/>
				<label className={styles.label} htmlFor="uncompletedTodo" title="Show only uncompleted todos">
					<small>Uncompleted</small>
				</label>
			</fieldset>
		</div>
	)
}

export default FiltersBar;