import { Link, matchPath, useLocation } from "react-router-dom";
import clsx from "clsx";

const SidebarItem = (props) => {
	const { item } = props;

	const { pathname } = useLocation();
	const isMatch = matchPath(item.regexMatchPath, pathname);

	return (
		<li className={clsx(`inline-block cursor-pointer rounded-t-lg p-4 `)}>
			<Link
				to={item.path}
				className={clsx(
					isMatch ? "border-b-2 border-blue-500 text-blue-500" : "text-black",
				)}
			>
				{item.label}
			</Link>
		</li>
	);
};

export default SidebarItem;
