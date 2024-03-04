import styles from '../../css/MobileBottomMenu.module.css';

// framer
import { motion } from 'framer-motion';

// components
import SmallBtn from '../buttons/SmallBtn';

// icons
import { BsLayoutSidebarInset } from "react-icons/bs";
import { MdLibraryAdd } from "react-icons/md";

function MobileBottomMenu(props) {
	const {
		onLeftSidebarOpen,
		onCreatetodo
	} = props;

	const menuVariants = {
		initial: {
			opacity: 0,
			y: '100%'
		},

		animate: {
			opacity: 1,
			y: '0'
		},

		exit: {
			opacity: 0,
			y: '100%'
		},
	}

	return (
		<motion.div
			{...menuVariants}
			className={styles.mobileBottomMenu}
		>
			<SmallBtn
				title="Toggle sidebar"
				icon={<BsLayoutSidebarInset />}
				onClick={onLeftSidebarOpen}
			/>

			<SmallBtn
				title="Create new todo"
				icon={<MdLibraryAdd />}
				bgColor="#1970c2"
				onClick={onCreatetodo}
			/>
		</motion.div>
	);
}

export default MobileBottomMenu;