import Exhibition from "./Exhibition";

const Exhibitions = (props) => {
	const { exhibitions } = props;
	return (
		<div className="grid grid-cols-12 gap-2">
			{exhibitions &&
				exhibitions.map((exhibition) => (
					<div className="col-span-3 md:col-span-4 sm:col-span-12" key={exhibition.id}>
						<Exhibition exhibition={exhibition} />
					</div>
				))}
		</div>
	);
};

export default Exhibitions;
