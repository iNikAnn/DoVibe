import styles from '../css/FiltersBar.module.css';

function FiltersBar() {
	return (
		<div className={styles.filtersWrapper}>
			<span>Filters:</span>

			<fieldset className={styles.fieldset}>
				<input type="radio" name="range" id="today" />
				<label className={styles.label} htmlFor="today"><small>All</small></label>

				<input type="radio" name="range" id="all" />
				<label className={styles.label} htmlFor="all"><small>Today</small></label>

				<span className={styles.separator}>|</span>

				<input type="checkbox" name="" id="uncompletedTodo" />
				<label className={styles.label} htmlFor="uncompletedTodo"><small>Only uncompleted</small></label>
			</fieldset>
		</div>
	)
}

export default FiltersBar;