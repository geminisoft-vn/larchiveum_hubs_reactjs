import SidebarItem from "./SidebarItem";

type Props = {
	items: {
		key: string;
		label: string;
		path: string;
		regexMatchPath: string;
	}[];
};

const Sidebar = (props: Props) => {
	const { items } = props;

	return (
		<ul className="-mb-px flex flex-col">
			{items &&
				items.length > 0 &&
				items.map((item) => <SidebarItem key={item.key} item={item} />)}
		</ul>
	);
};

export default Sidebar;
