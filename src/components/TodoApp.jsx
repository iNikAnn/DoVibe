import styles from '../css/TodoApp.module.css';

// react, uuid, framer
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';

// db
import emojis from '../db/dbEmojis';

// components
import LeftSideBar from './LeftSideBar';
import InputBar from './InputBar';
import FiltersBar from './FiltersBar';
import TodoList from './TodoList';
import Modal from '../components/Modal';
import Notification from './Notification';
import SmallBtn from './buttons/SmallBtn';
import DatePicker from './datepicker/DatePicker';
import TodoDetails from './TodoDetails';

//mobile components
import MobileHeader from './mobile/MobileHeader';
import MobileBottomMenu from './mobile/MobileBottomMenu';
import MobileBottomPopup from './mobile/MobileBottomPopup';
import MobileSettings from './mobile/MobileSettings';
import MobileEditTodoForm from './mobile/MobileEditTodoForm';
import TodoActionsHub from './mobile/TodoActionsHub';

// utils
import initDatabase from '../utils/initDatabase';
import updateDatabase from '../utils/updateDatabase';
import getFormattedDate from '../utils/getFormattedDate';
import modifyDateByOneDay from '../utils/modifyDateByOneDay';
import isTodoDuplicate from '../utils/isTodoDuplicate';
import isIdDuplicate from '../utils/isIdDuplicate';
import sortTodosByCompletion from '../utils/sortTodosByCompletion';
import updateReminders from '../utils/updateReminders';

// icons
import { FaUndoAlt } from "react-icons/fa";

function TodoApp() {
	const isMobileVersion = window.matchMedia('(max-width: 576px)').matches;
	const inputBarRef = useRef(null);
	const storredSettings = JSON.parse(localStorage.getItem('settings'));

	// color scheme
	const [colorScheme, setColorScheme] = useState(() => {
		if (storredSettings && storredSettings.colorScheme) {
			return storredSettings.colorScheme;
		} else {
			return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		};
	});

	// date
	const today = getFormattedDate(new Date());
	const [date, setDate] = useState(() => {
		return storredSettings ? storredSettings.date : '';
	});

	// add random emoji
	const [addRandomEmoji, setAddRandomEmoji] = useState(() => {
		if (storredSettings && 'addRandomEmoji' in storredSettings) {
			return storredSettings.addRandomEmoji;
		} else {
			return true;
		};
	});

	// todos
	const [todos, setTodos] = useState({});

	useEffect(() => {
		initDatabase(setTodos);
	}, []);

	useEffect(() => {
		updateDatabase(todos);
	}, [todos]);

	const allTodos = Object.values(todos)
		.map((arr) => arr.slice().reverse())
		.sort((a, b) => new Date(a[0].bin) - new Date(b[0].bin))
		.flat()
		.reverse();
	const [isTodoOpen, setIsTodoOpened] = useState(false);

	// filters
	const [isOnlyUncompleted, setOnlyUncompleted] = useState(() => {
		return storredSettings ? storredSettings.filters.isOnlyUncompleted : false;
	});

	// left sidebar
	const [leftSideBarIsVisible, setLeftSideBarIsVisible] = useState(() => {
		return storredSettings ? storredSettings.leftSideBar : false;
	});
	const [currentTodo, setCurrentTodo] = useState(JSON.parse(localStorage.getItem('currentTodo')) || null);

	// notification
	const [isNotifVisible, setIsNotifVisible] = useState(false);
	const [notifContent, setNotifContent] = useState(null);
	const hideNotifTimeOutRef = useRef(null);

	// system notification
	const [isNotifEnabled, setIsNotifEnabled] = useState(() => {
		if ('Notification' in window) {
			return window.Notification.permission === 'granted';
		};
	});

	const handleToggleNotif = (boolean) => {
		if ('Notification' in window) {
			if (window.Notification.permission === 'granted' && !boolean) {
				alert(
					'To turn off notifications, ' +
					'please do so in your browser settings.'
				);
			}
			else if (window.Notification.permission === 'denied' && boolean) {
				alert(
					'You have denied notification sending. ' +
					'To enable notifications, please adjust your browser settings.'
				);
			}
			else {
				window.Notification.requestPermission().then((res) => {
					if (res === 'granted') {
						setIsNotifEnabled(true);
					} else {
						setIsNotifEnabled(false);
					};
				});
			};
		};
	};

	// modal
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	// save current todo to local storage
	useEffect(() => {
		localStorage.setItem('currentTodo', JSON.stringify(currentTodo));
	}, [todos, currentTodo]);

	// save settings to local storage
	useEffect(() => {
		const settings = {
			leftSideBar: leftSideBarIsVisible,
			colorScheme,
			date,
			addRandomEmoji,
			filters: {
				isOnlyUncompleted
			},
		};

		localStorage.setItem('settings', JSON.stringify(settings));
	}, [leftSideBarIsVisible, colorScheme, date, addRandomEmoji, isOnlyUncompleted]);

	// initialize scheme on first load
	useEffect(() => {
		document.documentElement.setAttribute('data-scheme', colorScheme);
	}, []);

	const [isInputBarVisible, setIsInputBarVisible] = useState(!isMobileVersion);

	// highlights the inputbar parent form based on input focus
	useEffect(() => {
		const handleHighlightInputBar = () => {
			inputBarRef.current.closest('form').classList.add('focus');

			if (isMobileVersion) {
				setIsInputBarVisible(true);
			};
		};

		const handleBlurInputBar = () => {
			inputBarRef.current.closest('form').classList.remove('focus');

			if (isMobileVersion) {
				setIsInputBarVisible(false);
			};
		};

		if (inputBarRef.current) {
			inputBarRef.current.addEventListener('focus', handleHighlightInputBar);
			inputBarRef.current.addEventListener('blur', handleBlurInputBar);
		};

		return () => {
			if (inputBarRef.current) {
				inputBarRef.current.removeEventListener('focus', handleHighlightInputBar);
				inputBarRef.current.removeEventListener('blur', handleBlurInputBar);
			};
		};
	}, [isInputBarVisible]);

	// change the date by pressing comma / period
	useEffect(() => {
		const handleChangeDate = (e) => {
			if (((e.ctrlKey || e.metaKey) && e.altKey)
				&& (e.code === 'Comma' || e.code === 'Period')) {
				setDate(modifyDateByOneDay(date, e.code));
			};
		};

		window.addEventListener('keydown', handleChangeDate);

		// highlight the input after loading or changing the date
		if (window.matchMedia('(min-width: 576px)').matches) {
			inputBarRef.current.focus();
		};

		return () => window.removeEventListener('keydown', handleChangeDate);
	}, [date]);

	// checks if there are unfinished todos for a specific date
	const checkForUnfinishedTodosInDay = (date) => {
		const formattedDate = getFormattedDate(date);

		if (todos[formattedDate]) {
			return Boolean(todos[formattedDate].find((todo) => !todo.isCompleted));
		};

		return false;
	};

	// change color scheme
	const handleChangeScheme = (newScheme) => {
		document.documentElement.setAttribute('data-scheme', newScheme);

		// localStorage.setItem('scheme', newScheme);

		setColorScheme(newScheme);
	};

	// change view mode
	const handleChangeViewMode = (dateObj) => {
		setDate(dateObj ? getFormattedDate(dateObj) : '');
	};

	// add todo
	const handleAddTodo = (input) => {
		const day = date ? date : today;

		if (isTodoDuplicate(todos[day], input)) return;

		function getRandomEmoji() {
			return emojis[Math.floor(Math.random() * emojis.length)];
		}

		const updatedTodos = { ...todos };
		const newTodo = {
			title: (addRandomEmoji ? getRandomEmoji() + ' ' : '') + input,
			description: '',
			id: uuidv4(),
			isCompleted: false,
			isCurrent: false,
			hasReminder: false,
			reminders: [],
			date: Date.now(),
			bin: day
		};

		if (!Array.isArray(updatedTodos[day])) {
			updatedTodos[day] = []; // If it's the initial todo for the day, an empty array will be generated
		};

		updatedTodos[day] = [newTodo, ...updatedTodos[day]];

		setTodos(updatedTodos);
	};

	// set reminder
	useEffect(() => {
		const messageHandler = (event) => {
			console.log('message from sw: ', event);

			if (event.data.action === 'removeReminder') {
				console.log('removing reminder...');
				handleSetReminder(event.data.bin, event.data.id, event.data.reminderName, false);
			};
		};

		navigator?.serviceWorker?.addEventListener('message', messageHandler);

		return () => {
			navigator?.serviceWorker?.removeEventListener('message', messageHandler);
		};
	}, [])

	const handleSetReminder = (bin, id, reminderName, enabling) => {
		setTodos((prevTodos) => {
			const updatedTodos = { ...prevTodos };
			const updatedDailyTodos = updatedTodos[bin].map((todo) => {
				if (todo.id === id) {
					return updateReminders(todo, reminderName, enabling);
				} else {
					return { ...todo };
				};
			});

			updatedTodos[bin] = updatedDailyTodos;

			return updatedTodos;
		});
	};

	// edit todo
	const handleEditTodo = (bin, id, newTitle, newDesc) => {
		if (!newTitle || isTodoDuplicate(todos[bin], newTitle, id)) return;

		const updatedTodos = { ...todos };
		const updatedDailyTodos = updatedTodos[bin].map((todo) => {
			return (todo.id === id) ? { ...todo, title: newTitle, description: newDesc } : { ...todo };
		});

		updatedTodos[bin] = updatedDailyTodos;

		setTodos(updatedTodos);

		if (currentTodo && currentTodo.id === id) {
			setCurrentTodo({ ...currentTodo, title: newTitle });
		};
	};

	// remove todo
	const handleRemoveTodo = (bin, id, showNotif = true) => {
		const updatedTodos = { ...todos };

		updatedTodos[bin] = updatedTodos[bin].filter((todo) => todo.id !== id);

		if (updatedTodos[bin].length === 0) {
			delete updatedTodos[bin];
		};

		setTodos(updatedTodos);

		if (currentTodo && currentTodo.id === id) {
			setCurrentTodo(null);
		};

		// display notification about todo deletion
		if (showNotif) {
			setNotifContent(
				<div className={styles.removeTodoNotif}>
					<span>Removed successfully!</span>

					<SmallBtn
						text="Undo"
						// title="Undo Deletion"
						icon={<FaUndoAlt />}
						onClick={() => {
							setTodos({ ...todos });
							setIsNotifVisible(false);
						}}
					/>
				</div>
			);

			setIsNotifVisible(true);
			hideNotifTimeOutRef.current = hideNotifeTimeout(4000);
		};
	};

	const hideNotifeTimeout = (duration) => {
		return setTimeout(() => {
			setIsNotifVisible(false);
		}, duration);
	};

	// сlearing the timeout on hovering over the notification
	const handleNotifHoverStart = () => {
		clearTimeout(hideNotifTimeOutRef.current);
	};

	// setting a timeout on the 'onHoverEnd' event
	const handleNotifHoverEnd = () => {
		setTimeout(() => {
			setIsNotifVisible(false);
		}, 2000);
	};

	// mark todo as completed/uncompleted
	const handleMarkTodo = (bin, id) => {
		const updatedTodos = { ...todos };

		updatedTodos[bin] = updatedTodos[bin].map((todo) => {
			if (todo.id === id) {
				if (todo.isCurrent) {
					setCurrentTodo(null);
				};

				return {
					...todo,
					isCompleted: !todo.isCompleted,
					isCurrent: todo.isCurrent && false,
					date: Date.now(),
					id: uuidv4(),
					reminders: [],
					hasReminder: false
				};
			};

			return { ...todo };
		});

		handleRemoveTodo(bin, id, false);

		updatedTodos[bin] = sortTodosByCompletion(updatedTodos[bin]);

		setTimeout(() => {
			setTodos(updatedTodos);
		}, 600);
	};

	// mark todo as current
	const handleMarkTodoAsCurrent = (bin, id) => {
		setTodos((prevTodos) => {
			const updatedTodos = { ...prevTodos };

			if (currentTodo && updatedTodos[currentTodo.bin] && currentTodo.bin !== bin) {
				updatedTodos[currentTodo.bin] = updatedTodos[currentTodo.bin].map((todo) => {
					return (todo.id === currentTodo.id)
						? { ...todo, isCurrent: false }
						: { ...todo };
				});
			};

			updatedTodos[bin] = updatedTodos[bin].map((todo) => {
				return (todo.id === id)
					? { ...todo, isCurrent: !todo.isCurrent }
					: { ...todo, isCurrent: false };
			});

			return updatedTodos;
		})

		setCurrentTodo((prevCurrent) => {
			return (prevCurrent && prevCurrent.id === id)
				? null
				: { ...todos[bin].find((todo) => todo.id === id) };
		});
	};

	// reorder todo
	const handleReorderTodo = (reorderedList, movedTodo) => {
		if (!movedTodo || movedTodo.type === 'dateSeparator' || isIdDuplicate(reorderedList)) return;

		const updatedIndex = reorderedList.indexOf(reorderedList.find((item) => item.id === movedTodo.id));
		const prev = reorderedList[updatedIndex - 1];
		const next = reorderedList[updatedIndex + 1];

		const hasDateSeparatorBelow = !!reorderedList
			.slice(updatedIndex)
			.find((el) => el.type === 'dateSeparator');

		if ((!prev && next.type === 'dateSeparator') || (prev && (prev.isCompleted && (!next || !hasDateSeparatorBelow)))) return;

		let updatedDate = (prev && next && prev.date !== undefined && next.date !== undefined && !next.isCompleted && !prev.isCompleted)
			? (Math.floor((prev.date + next.date) / 2))
			: !prev || prev.date === undefined
				? Date.now() // set the current timestamp if there are no other todos above
				: Math.floor(prev.date / 2); // halfway based on the timestamp of the previous todo if no todos below

		const updatedTodos = { ...todos };
		const isMovedToAnotherDay = prev && (prev.bin !== movedTodo.bin || (prev.isCompleted && next));
		let targetBin = movedTodo.bin;

		if (isMovedToAnotherDay) {
			// remove the todo from its original bin
			updatedTodos[movedTodo.bin] = updatedTodos[movedTodo.bin].filter((todo) => todo.id !== movedTodo.id);

			// if move down
			if (prev.isCompleted && prev.bin === movedTodo.bin) {
				updatedDate = Date.now();

				// find the first date separator bin after the updatedIndex
				targetBin = reorderedList.slice(updatedIndex).find((el) => el.type === 'dateSeparator').bin;
			}
			// if move up
			else if (prev.isCompleted && prev.bin !== movedTodo.bin) {
				const lastUncompletedTodo = reorderedList.find((todo, index, arr) => {
					return todo.bin === prev.bin && todo.type !== 'dateSeparator' && arr[index + 1].isCompleted;
				});

				updatedDate = lastUncompletedTodo ? Math.floor(lastUncompletedTodo.date / 2) : Date.now();

				targetBin = prev.bin;
			}
			else {
				targetBin = prev.bin;
			};

			if (isTodoDuplicate(todos[targetBin], movedTodo.title)) return;

			// add the todo to the target bin
			updatedTodos[targetBin] = [{ ...movedTodo, bin: targetBin, date: updatedDate }, ...updatedTodos[targetBin]];
		} else {
			// update the date of the todo in its original bin
			updatedTodos[movedTodo.bin] = updatedTodos[movedTodo.bin].map((todo) => {
				return todo.id === movedTodo.id ? { ...todo, date: updatedDate } : { ...todo };
			});
		};

		if (isNaN(updatedDate)) return;

		updatedTodos[targetBin] = sortTodosByCompletion(updatedTodos[targetBin]);

		setTodos(updatedTodos);
	};

	const handleToggleLeftSideBar = () => {
		setLeftSideBarIsVisible((state) => !state);
	};

	// toggle modal
	const handleToggleModal = (content) => {
		if (content === null) {
			setModalIsVisible(false);
			setModalContent(null);
			return;
		};

		setModalContent(content);
		setModalIsVisible(true);
	};

	// mobile bottom popup
	const [isMobileBottomPopupVisible, setMobileBottomPopupVisible] = useState(false);
	const [mobilePopupTitle, setMobilePopupTitle] = useState(null);
	const [mobileBottomPopupContent, setMobileBottomPopupContent] = useState(null);

	const handleShowBottomPopup = (name, content) => {
		if (!isMobileVersion) return;

		switch (name) {
			case 'mobileSettings':
				setMobilePopupTitle('Settings');
				setMobileSettingsVisible(true);
				break;

			case 'mobileCalendar':
				setMobilePopupTitle('Calendar');
				setIsMobileCalendarVisible(true);
				break;

			case 'mobileTodoItemMenu':
				setMobilePopupTitle(content.title);
				setMobileTodoActionsHubProps(content);
				setIsMobileTodoActionsHubVisible(true);
				break;

			case 'mobileTodoDetails':
				setMobilePopupTitle('Todo details');
				setMobileTodoDetailsProps(content);
				break;

			default:
				setMobilePopupTitle(null);
				setMobileBottomPopupContent(content);
				break;
		};

		setMobileBottomPopupVisible(true);
	};

	const handleCloseBottomPopup = () => {
		setIsMobileCalendarVisible(false);
		setMobileSettingsVisible(false);
		setMobileBottomPopupContent(null);
		setIsTodoOpened(false);
		setMobileBottomPopupVisible(false);
		setIsMobileTodoActionsHubVisible(false);
	};

	// mobile overlay
	const [isOverlayVisible, setOverlayVisible] = useState(false);

	// mobile todo details props
	const [mobileTodoDetailsProps, setMobileTodoDetailsProps] = useState(null);

	// mobile bottom menu
	const [isMobileBottomMenuVisible, setMobileBottomMenuVisible] = useState(true);

	// mobile settings
	const [isMobileSettingsVisible, setMobileSettingsVisible] = useState(false);

	// mobile calendar
	const [isMobileCalendarVisible, setIsMobileCalendarVisible] = useState(false);

	// mobilde todo actions hub
	const [isMobileTodoActionsHubVisible, setIsMobileTodoActionsHubVisible] = useState(false);
	const [mobileTodoActionsHubProps, setMobileTodoActionsHubProps] = useState(null);

	// mobile edit todo form
	const [isMobileEditTodoFormVisible, setMobileEditTodoFormVisible] = useState(false);
	const [mobileEditTodoFormProps, setMobileEditTodoFormProps] = useState(null);

	const handleShowMobileEditTodoForm = (props) => {
		setMobileEditTodoFormProps(props);
		setMobileEditTodoFormVisible(true);
	};

	// toggle mobile bottom menu visibility based on...
	useEffect(() => {
		if (!isMobileVersion) return;

		const shouldHideMenu =
			isInputBarVisible ||
			isMobileBottomPopupVisible ||
			isTodoOpen ||
			isMobileEditTodoFormVisible ||
			isNotifVisible;

		setMobileBottomMenuVisible(!shouldHideMenu);
	}, [isMobileVersion, isInputBarVisible, isMobileBottomPopupVisible, isTodoOpen, isMobileEditTodoFormVisible, isNotifVisible]);

	// toggle mobile overlay visibility based on...
	useEffect(() => {
		if (!isMobileVersion) return;

		const shouldHideMenu =
			isInputBarVisible ||
			isMobileBottomPopupVisible ||
			isTodoOpen ||
			isMobileEditTodoFormVisible;

		setOverlayVisible(shouldHideMenu);
	}, [isMobileVersion, isInputBarVisible, isMobileBottomPopupVisible, isTodoOpen, isMobileEditTodoFormVisible]);

	return (
		<div className={styles.todoApp}>
			<div className={styles.content}>
				{/* <h1>DoVibe</h1> */}
				{isMobileVersion && (
					<MobileHeader
						date={date}
						onChangeViewMode={handleChangeViewMode}
					/>
				)}

				<AnimatePresence initial={false}>
					{isInputBarVisible && (
						<InputBar
							key="inputBar"
							inputBarRef={inputBarRef}
							isMobileVersion={isMobileVersion}
							onSubmit={handleAddTodo}
							colorScheme={colorScheme}
							onChangeScheme={handleChangeScheme}
							addRandomEmoji={addRandomEmoji}
							onToggleRandomEmoji={() => setAddRandomEmoji((curr) => !curr)}
						/>
					)}

					{isMobileEditTodoFormVisible && (
						<MobileEditTodoForm
							{...mobileEditTodoFormProps}
							onClose={() => setMobileEditTodoFormVisible(false)}
							onSubmit={handleEditTodo}
						/>
					)}
				</AnimatePresence>

				{!isMobileVersion && (
					<FiltersBar
						initialDate={date}
						onChangeViewMode={handleChangeViewMode}
						onToggleLeftSideBar={handleToggleLeftSideBar}
						setOnlyUncompleted={setOnlyUncompleted}

						leftSideBarIsVisible={leftSideBarIsVisible}
						isOnlyUncompleted={isOnlyUncompleted}
					/>
				)}

				<TodoList
					list={
						// displaying daily todos; if no date is selected, show all todos
						date ? todos[date] : allTodos
					}
					date={date}
					showCustomModal={handleToggleModal}
					onReorderTodo={handleReorderTodo}
					onEditTodo={handleEditTodo}
					onSetReminder={handleSetReminder}
					onRemoveTodo={handleRemoveTodo}
					onMarkTodo={handleMarkTodo}
					onMarkTodoAsCurrent={handleMarkTodoAsCurrent}
					onChangeViewMode={handleChangeViewMode}

					onShowItemMenu={(props) => {
						handleShowBottomPopup('mobileTodoItemMenu', props)
					}}
					onCloseItemMenu={handleCloseBottomPopup}

					isOnlyUncompleted={isOnlyUncompleted}

					isTodoOpen={isTodoOpen}
					onToggleTodo={(props) => {
						if (isMobileVersion) {
							handleShowBottomPopup('mobileTodoDetails', props);
						};

						setIsTodoOpened((prev) => !prev);
					}}

					isMobileVersion={isMobileVersion}
				/>
			</div>

			<AnimatePresence initial={false}>
				{isOverlayVisible && (
					<motion.div
						key="overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: .8 }}
						exit={{ opacity: 0 }}
						className={styles.overlay}
						onPointerDown={() => {
							setMobileEditTodoFormVisible(false);
							setIsTodoOpened(false);
							handleCloseBottomPopup();
						}}
					/>
				)}

				{leftSideBarIsVisible && (
					<LeftSideBar
						key={'leftSideBar'}
						initialDate={date}
						todos={todos}
						currentTodo={currentTodo}
						onPickDate={handleChangeViewMode}
						checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
					/>
				)}

				{modalIsVisible && (
					<Modal
						key={'modal'}
						onClose={() => setModalIsVisible(false)}
					>
						{modalContent}
					</Modal>
				)}

				{isNotifVisible && (
					<Notification
						key={'notif'}
						onClose={() => setIsNotifVisible(false)}
						onHoverStart={handleNotifHoverStart}
						onHoverEnd={handleNotifHoverEnd}
					>
						{notifContent}
					</Notification>
				)}

				{(isMobileBottomMenuVisible && isMobileVersion) && (
					<MobileBottomMenu
						key="mobileBottomMenu"
						onOpenLeftSidebar={() => setLeftSideBarIsVisible((prevState) => !prevState)}
						onCreateTodo={() => {
							setIsInputBarVisible(true);
							setTimeout(() => {
								inputBarRef.current.focus();
							}, 0)
						}}
						onOpenCalendar={() => handleShowBottomPopup('mobileCalendar')}
						onOpenSettings={() => handleShowBottomPopup('mobileSettings')}
					/>
				)}

				{isMobileBottomPopupVisible && (
					<MobileBottomPopup
						key="mobailBottomPopup"
						title={mobilePopupTitle}
						onClose={handleCloseBottomPopup}
					>
						{isMobileSettingsVisible && (
							<MobileSettings
								//notifications
								isNotifEnabled={isNotifEnabled}
								onToogleNotif={handleToggleNotif}

								// color scheme switcher
								colorScheme={colorScheme}
								onChangeScheme={handleChangeScheme}

								// add random emoji
								addRandomEmoji={addRandomEmoji}
								onToggleRandomEmoji={() => setAddRandomEmoji((curr) => !curr)}

								// view mode
								initialDate={date}
								onChangeViewMode={handleChangeViewMode}

								// filter (is only uncompleted)
								isOnlyUncompleted={isOnlyUncompleted}
								setOnlyUncompleted={setOnlyUncompleted}
							/>
						)}

						{isMobileCalendarVisible && (
							<DatePicker
								todos={todos}
								initialDate={date}
								onPickDate={handleChangeViewMode}
								checkForUnfinishedTodosInDay={checkForUnfinishedTodosInDay}
							/>
						)}

						{isMobileTodoActionsHubVisible && (
							<TodoActionsHub
								{...todos[mobileTodoActionsHubProps.bin].find((todo) => {
									return todo.id === mobileTodoActionsHubProps.id;
								})}
								onMarkAsCurrent={handleMarkTodoAsCurrent}
								onMark={handleMarkTodo}
								onSetReminder={handleSetReminder}
								onEdit={handleShowMobileEditTodoForm}
								onRemove={handleRemoveTodo}
								onActionFinished={handleCloseBottomPopup}
							/>
						)}

						{isTodoOpen && (
							<TodoDetails
								{...mobileTodoDetailsProps}
							/>
						)}

						{mobileBottomPopupContent && (
							mobileBottomPopupContent
						)}
					</MobileBottomPopup>
				)}
			</AnimatePresence>
		</div>
	);
}

export default TodoApp;