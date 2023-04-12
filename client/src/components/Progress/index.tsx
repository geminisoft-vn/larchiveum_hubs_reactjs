import { useSelector } from "react-redux";

import { RootState } from "src/app/store";

type Props = {};

const Progress: React.FC<Props> = () => {
	const { percent } = useSelector((state: RootState) => state.progress);
	return (
		<div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
			<div
				className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
				style={{
					width: `${percent || 0}%`,
				}}
			/>
		</div>
	);
};

export default Progress;
