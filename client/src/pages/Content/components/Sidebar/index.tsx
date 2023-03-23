import clsx from "clsx";

type Props = {
	items: {
		key: string;
		label: string;
		onClick: () => void;
	}[];
};

const Sidebar = (props: Props) => {
	const { items } = props;
	return (
		<ul className="-mb-px flex flex-col">
			{items &&
				items.length > 0 &&
				items.map((item) => (
					<li
						className={clsx(
							`inline-block cursor-pointer rounded-t-lg p-4`,
							// item.key === selectedTab &&
							// 	"border-b-2 border-blue-500 text-blue-500"
						)}
					>
						<button type="button" onClick={item.onClick}>
							{item.label}
						</button>
					</li>
				))}
		</ul>
	);
};

export default Sidebar;
