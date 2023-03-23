import PropTypes from "prop-types";

const FormContainer = (props) => {
	const { onSubmit } = props;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				if (onSubmit) onSubmit();
			}}
		>
			{props.children}
		</form>
	);
};

FormContainer.propTypes = {
	children: PropTypes.element,
	onSubmit: PropTypes.func,
	formContext: PropTypes.object,
};

export default FormContainer;
