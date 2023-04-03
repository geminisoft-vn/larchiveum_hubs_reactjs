import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination as MUIPagination } from "@mui/material";
import clsx from "clsx";

import { IParams } from "src/interfaces";

import Button from "../Button";

type Props = {
	pageCount?: number;
	page: number;
	hasNext: boolean | undefined;
	hasPrev: boolean | undefined;
	setParams: React.Dispatch<React.SetStateAction<IParams>>;
};

const Pagination = (props: Props) => {
	const { page, pageCount, hasNext, hasPrev, setParams } = props;

	const handleChange = (_page: number) => {
		setParams((prev: IParams) => ({ ...prev, page: _page }));
	};

	const handleGoToNextPage = () => {
		if (hasNext) {
			setParams((prev: IParams) => ({ ...prev, page: prev.page + 1 }));
		}
	};

	const handleGoToPrevPage = () => {
		if (hasPrev) {
			setParams((prev: IParams) => ({ ...prev, page: prev.page - 1 }));
		}
	};

	return (
		<nav aria-label="Pagination">
			<ul className="inline-flex items-center gap-4 -space-x-px">
				<li>
					<button
						className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
						onClick={handleGoToPrevPage}
					>
						<span className="sr-only">Previous</span>
						<svg
							aria-hidden="true"
							className="h-4 w-4"
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
					</button>
				</li>

				{pageCount &&
					new Array(pageCount).fill(0).map((_, index) => (
						<li key={index}>
							<button
								className={clsx(
									"h-8 w-8 rounded-full",
									page === index + 1
										? "bg-blue-500 text-white"
										: "hover:bg-gray-100",
								)}
								onClick={() => handleChange(index + 1)}
							>
								{index + 1}
							</button>
						</li>
					))}

				<li>
					<button
						className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
						onClick={handleGoToNextPage}
					>
						<span className="sr-only">Next</span>
						<svg
							aria-hidden="true"
							className="h-4 w-4"
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
					</button>
				</li>
			</ul>
		</nav>
	);
};

Pagination.defaultProps = {
	pageCount: 0
};

export default Pagination;
