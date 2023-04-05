import Exhibition from "./Exhibition";

const Exhibitions = (props) => {
	const { exhibitions } = props;
	return (
		<div className="grid w-full grid-cols-12 gap-2">
			{exhibitions &&
				exhibitions.map((exhibition) => (
					<div
						className="col-span-3 sm:col-span-12 md:col-span-4"
						key={exhibition.id}
					>
						<Exhibition exhibition={exhibition} />
					</div>
				))}
		</div>
	);
};

export default Exhibitions;
