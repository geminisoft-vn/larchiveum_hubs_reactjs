import clsx from "clsx";

type Props = {
	onSubmit: () => void;
	children: JSX.Element | JSX.Element[];
	className?: string;
};

const FormContainer = (props: Props) => {
	const { onSubmit, children, className } = props;

	return (
		<form
			className={clsx(className)}
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				if (onSubmit) onSubmit();
			}}
		>
			{children}
		</form>
	);
};

FormContainer.defaultProps = {
	className: "",
};

export default FormContainer;
