type Props = {
	name: string;
};

const Icon = (props: Props) => {
	const { name } = props;

	return (
		<div>
			<i className={name} />
		</div>
	);
};

export default Icon;
