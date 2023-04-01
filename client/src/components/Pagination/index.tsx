import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination as MUIPagination } from "@mui/material";

import { IParams } from "src/interfaces";

import Button from "../Button";

type Props = {
	total?: number | undefined;
	pageSize: number;
	page: number;
	setParams: React.Dispatch<React.SetStateAction<IParams>>;
};

const Pagination = (props: Props) => {
	const { total, pageSize, page, setParams } = props;

	const pageCount = useMemo(() => {
		if (!total) return 0;
		return Math.ceil(total / pageSize);
	}, [total, pageSize]);

	const handleChange = (_page: number) => {
		setParams((prev: IParams) => ({ ...prev, page: _page }));
	};

	console.log(window.location);

	return (
		<nav aria-label="Pagination">
			<ul className="inline-flex items-center -space-x-px">
				<li>
					<Button className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						<span className="sr-only">Previous</span>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</Button>
				</li>

				{pageCount &&
					new Array(pageCount).fill(0).map((_, index) => (
						<li key={index}>
							<Button
								onClick={() => handleChange(index + 1)}
								className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
							>
								{index + 1}
							</Button>
						</li>
					))}

				<li>
					<Button className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
						<span className="sr-only">Next</span>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</Button>
				</li>
			</ul>
		</nav>
	);
};

Pagination.defaultProps = {
	total: 0,
};

export default Pagination;
