import "./popup.scss";

const Popup = (props) => {
	const { data, title, size, content, closeButton, actions, handleClose } =
		props;

	const currentProps = {
		data: {},
		title: "Popup larchiveum",
		size: "lg",
		content: <p>Wellcome to larchiveum</p>,
		closeButton: true,
		actions: [],
	};

	currentProps.data = data || currentProps.data;
	currentProps.title = title || currentProps.title;
	currentProps.size = size || currentProps.size;
	currentProps.content = content || currentProps.content;
	currentProps.closeButton = closeButton || currentProps.closeButton;
	currentProps.actions = actions || currentProps.actions;
	currentProps.handleClose = handleClose || currentProps.handleClose;

	return (
		<div className="popup-overlay">
			<div className={`popup-content ${currentProps.size}`}>
				<div className="modal">
					{currentProps.closeButton ? (
						<button
							type="button"
							className="close"
							onClick={currentProps.handleClose}
						>
							&times;
						</button>
					) : (
						""
					)}
					<div className="header"> {currentProps.title}</div>
					<div className="content">{currentProps.content}</div>
					<div className="actions">
						{currentProps.actions.map(
							(action, i) =>
								!action.hidden && (
									<button
										type="button"
										key={action.text}
										className={action.class}
										onClick={() => {
											action.callback(currentProps.data);
										}}
										disabled={action.disabled || false}
									>
										{action.text}
									</button>
								),
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Popup;
