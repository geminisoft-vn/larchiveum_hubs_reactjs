import { Outlet } from "react-router-dom";

const AuthLayout = () => (
	<div
		className="w-full h-full flex items-center justify-center"
		style={{
			backgroundImage: `url(https://hubs-dev-01-assets.larchiveum.link/hubs/assets/login/background-da651ea8f8f4db5bec199e614ba84843.jpg)`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "cover",
		}}
	>
		<Outlet />
	</div>
);

export default AuthLayout;
