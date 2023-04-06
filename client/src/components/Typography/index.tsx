import clsx from "clsx";

type Props = {
	children:
		| JSX.Element
		| JSX.Element[]
		| string
		| (JSX.Element | JSX.Element[] | string)[]
		| undefined;
	className?: string;
	ellipsis?: boolean;
};

const Typography = (props: Props) => {
	const { children, className, ellipsis } = props;
	return (
		<p
			className={clsx(
				className,
				ellipsis &&
					"max-w-full overflow-hidden text-ellipsis whitespace-nowrap",
			)}
		>
			{children}
		</p>
	);
};

Typography.defaultProps = {
	className: "",
	ellipsis: false,
};

export default Typography;
