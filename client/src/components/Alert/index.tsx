import { FieldError } from "react-hook-form";
import clsx from "clsx";

type Props = {
	type: "error" | "info" | "success" | "warning";
	error: FieldError | undefined;
	key: string;
};

const Alert = (props: Props) => {
	const { type, error, key } = props;
	return (
		<div
			className={clsx(
				"p-4 mb-4 text-sm  rounded-lg ",
				type === "error" && "text-red-800 bg-red-50",
				type === "info" && "text-blue-800 bg-blue-50",
				type === "success" && "text-green-800 bg-green-50",
				type === "warning" && "text-yellow-800 bg-yellow-50",
			)}
			role="alert"
		>
			{error && error[key]}
		</div>
	);
};

export default Alert;
