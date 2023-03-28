type Props = {
	label: string;
	renderInput: () => JSX.Element;
};

const FormItem = (props: Props) => {
	const { label, renderInput } = props;

	return (
		<div className="w-full">
			<label
				className="mb-2 text-df block font-medium text-gray-900 "
				htmlFor={label}
			>
				{label}
			</label>
			{renderInput && renderInput()}
		</div>
	);
};

export default FormItem;
