type Props = {
	name: string;
	label: string;
	renderInput: () => JSX.Element;
};

const FormItem = (props: Props) => {
	const { name, label, renderInput } = props;

	return (
		<div className="w-full">
			<label
				className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
				htmlFor={name}
			>
				{label}
			</label>
			{renderInput && renderInput()}
		</div>
	);
};

export default FormItem;
