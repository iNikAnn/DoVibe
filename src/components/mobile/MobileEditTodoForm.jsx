import styles from '../../css/MobileEditTodoForm.module.css';

// framer
import { motion } from 'framer-motion';

// components
import SmallBtn from '../buttons/SmallBtn';

// icons
import { FaSave } from "react-icons/fa";

function MobileEditTodoForm({ bin, id, title, desc, onClose, onSubmit }) {
	const formVariants = {
		initial: {
			opacity: 0,
			height: 0,
			y: '-100%'
		},

		animate: {
			opacity: 1,
			height: 'auto',
			y: 0
		},

		exit: {
			opacity: 0,
			height: 0,
			y: 0
		},
	};

	return (
		<motion.div
			className={styles.formWrapper}
			{...formVariants}
		>
			<form
				className={styles.form}
				action="submit"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(bin, id, e.target.newTitle.value, e.target.newDesc.value);
					onClose();
				}}
			>
				<input
					name="newTitle"
					id="newTitle"
					type="text"
					defaultValue={title}
					placeholder="New title"
					autoFocus
				/>

				<textarea
					name="newDesc"
					id="newDesc"
					cols="1"
					rows="8"
					defaultValue={desc}
					placeholder="Description"
				>

				</textarea>

				<div className={styles.btnWrapper}>
					<SmallBtn
						text="Cancel"
						title="Cancel edit todo"
						onClick={onClose}
					/>

					<SmallBtn
						text="Save"
						title="Save Changes"
						icon={<FaSave />}
						type="submit"
					// bgColor="#3eb489"
					/>
				</div>
			</form>
		</motion.div>
	)
}

export default MobileEditTodoForm;