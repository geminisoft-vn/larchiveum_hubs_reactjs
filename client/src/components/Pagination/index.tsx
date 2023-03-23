import React, { useMemo } from "react";
import { Pagination as MUIPagination } from "@mui/material";

import { IParams } from "src/interfaces";

type Props = {
	totalItems: number;
	perPage: number;
	page: number;
	setParams: React.Dispatch<React.SetStateAction<IParams>>;
};

function Pagination(props: Props) {
	const { totalItems, perPage, page: currentPage, setParams } = props;

	const pageCount = useMemo(
		() => Math.ceil(totalItems / perPage),
		[totalItems, perPage]
	);

	const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setParams((prev: IParams) => ({ ...prev, page }));
	};

	return (
		<MUIPagination
			count={pageCount}
			page={currentPage}
			onChange={handleChange}
		/>
	);
}

export default Pagination;
