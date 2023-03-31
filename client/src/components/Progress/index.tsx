import { useSelector } from "react-redux";

import { RootState } from "src/app/hooks";

type Props = {};

const Progress: React.FC<Props> = () => {
	const { percent } = useSelector((state: RootState) => state.progress);
	return (
		<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
			<div
				className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
				style={{
					width: `${percent || 0}%`,
				}}
			/>
		</div>
	);
};

export default Progress;
