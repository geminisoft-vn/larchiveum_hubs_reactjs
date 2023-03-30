import clsx from "clsx";

type Props = {
	children:
		| JSX.Element
		| JSX.Element[]
		| string
		| (JSX.Element | JSX.Element[] | string)[];
	className?: string;
};

const Typography = (props: Props) => {
	const { children, className } = props;
	return <p className={clsx(className)}>{children}</p>;
};

Typography.defaultProps = {
	className: "",
};

export default Typography;
