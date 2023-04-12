import { Outlet } from "react-router-dom";

import { Header, Stack } from "src/components";

const MainLayout = (props) => (
	<div className="flex h-full w-4/5 flex-col items-center justify-between gap-2 bg-white p-4">
		<Header />
		<main className="h-full w-full">
			<Outlet />
		</main>
	</div>
);

export default MainLayout;
