import { Outlet } from "react-router-dom";

const PreviewLayout = () => {
	return (
		<div className="flex h-full w-full justify-center">
			<Outlet />
		</div>
	);
};

export default PreviewLayout;
