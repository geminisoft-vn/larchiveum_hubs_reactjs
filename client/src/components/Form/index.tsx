import clsx from "clsx";

type Props = {
	id: string;
	onSubmit: () => void;
	children: JSX.Element | JSX.Element[];
	className?: string;
};

const FormContainer = (props: Props) => {
	const { id, onSubmit, children, className } = props;

	return (
		<form
			id={id}
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
