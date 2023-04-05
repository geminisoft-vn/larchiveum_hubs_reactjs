import React, { useCallback, useEffect, useState } from "react";

import ExhibitionsService from "src/api/ExhibitionsService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { Pagination, Stack } from "src/components";
import {
	getExhibitions,
	setExhibitions,
} from "src/features/exhibition/ExhibitionSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserInfo } from "src/features/user/selectors";
import { IParams } from "src/interfaces";

import Exhibitions from "./components/Exhibitions";

import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(getUserInfo);
	const { data: exhibitions, pages } = useAppSelector(getExhibitions);

	const [params, setParams] = useState<IParams>({
		page: 1,
		pageSize: 9,
	});

	const getAllExhibitions = useCallback(() => {
		if (user) {
			ExhibitionsService.getAllWithAuthExhibitions(params)
				.then((res) => {
					if (res.result === "ok") {
						dispatch(
							setExhibitions({
								data: res.data,
								items: res.items,
								pages: res.pages,
							}),
						);
					}
				})
				.catch(() => {
					dispatch(
						showToast({
							type: "error",
							message: "Get Exhibitions fail !",
						}),
					);
				});
		} else {
			ExhibitionsService.getAllExhibitions(params)
				.then((res) => {
					if (res.result === "ok") {
						dispatch(
							setExhibitions({
								data: res.data,
								items: res.items,
								pages: res.pages,
							}),
						);
					}
				})
				.catch(() => {
					dispatch(
						showToast({
							type: "error",
							message: "Get Exhibitions fail !",
						}),
					);
				});
		}
	}, []);

	useEffect(() => {
		getAllExhibitions();
	}, [getAllExhibitions, params.page, params.sort]);

	return (
		<div className="h-full p-2">
			<Stack
				direction="col"
				alignItems="center"
				justifyContent="between"
				gap={2}
			>
				{/* <Filter
					sortNewest={sortNewest}
					sortOldest={sortOldest}
					isActiveSortASC={isActiveSortASC}
					isActiveSortDESC={isActiveSortDESC}
				/> */}

				<Exhibitions exhibitions={exhibitions} />

				<Pagination
					page={params.page}
					pageCount={pages.total}
					setParams={setParams}
					hasNext={pages.hasNext}
					hasPrev={pages.hasPrev}
				/>
			</Stack>
		</div>
	);
};

export default HomePage;
