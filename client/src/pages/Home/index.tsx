import { useState } from "react";

import { useAppDispatch } from "src/app/hooks";
import { Loader, Pagination, Stack } from "src/components";
import { setExhibitions } from "src/features/exhibition/ExhibitionSlide";
import { setPagination } from "src/features/pagination/PaginationSlice";
import { useData } from "src/hooks";
import { IParams } from "src/interfaces";

import Exhibitions from "./components/Exhibitions";

import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
	const dispatch = useAppDispatch();

	const [params, setParams] = useState<IParams>({
		page: 1,
		pageSize: 9,
	});

	const { data: exhibitions, isLoading } = useData(
		`/exhibitions`,
		"GET",
		params,
		(data, pages) => {
			dispatch(
				setExhibitions({
					data,
				}),
			);
			dispatch(setPagination(pages));
		},
	);

	return (
		<div className="h-full p-2">
			{ isLoading ? (
				<Loader />
			) : (
				<Stack
					direction="col"
					alignItems="center"
					justifyContent="between"
					gap={2}
					className="h-full"
				>
					{/* <Filter
					sortNewest={sortNewest}
					sortOldest={sortOldest}
					isActiveSortASC={isActiveSortASC}
					isActiveSortDESC={isActiveSortDESC}
				/> */}

					<Exhibitions exhibitions={exhibitions} />

					<Pagination page={params.page} setParams={setParams} />
				</Stack>
			)}
		</div>
	);
};

export default HomePage;
