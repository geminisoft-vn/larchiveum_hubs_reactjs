import clsx from "clsx";

type Props = {
	children: JSX.Element | JSX.Element[] | string | undefined;
	className?: string;
};

const Box = (props: Props) => {
	const { children, className } = props;
	return <div className={clsx(className)}>{children}</div>;
};

Box.defaultProps = {
	className: "",
};

export default Box;
