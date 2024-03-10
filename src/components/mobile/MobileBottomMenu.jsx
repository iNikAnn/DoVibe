import styles from '../../css/MobileBottomMenu.module.css';

// framer
import { motion } from 'framer-motion';

// components
import SmallBtn from '../buttons/SmallBtn';

// icons
import { BsLayoutSidebarInset } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { MdSettings } from "react-icons/md";

function MobileBottomMenu(props) {
	const {
		onOpenLeftSidebar,
		onCreateTodo,
		onOpenCalendar,
		onOpenSettings
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
	};

	return (
		<motion.div
			{...menuVariants}
			className={styles.mobileBottomMenu}
		>
			<div className={styles.content}>
				{/* <SmallBtn
					title="Toggle sidebar"
					icon={<BsLayoutSidebarInset />}
					onClick={onOpenLeftSidebar}
				/> */}

				<SmallBtn
					title="Open settings"
					icon={<MdSettings />}
					onClick={onOpenSettings}
					bgColor="unset"
				/>

				<SmallBtn
					title="Open calendar"
					icon={<FaCalendar />}
					onClick={onOpenCalendar}
					bgColor="unset"
				/>

				<SmallBtn
					// text="Create ToDo"
					title="Create new todo"
					icon={<MdLibraryAdd />}
					bgColor="#1970c2"
					onClick={onCreateTodo}
				/>
			</div>
		</motion.div>
	);
}

export default MobileBottomMenu;