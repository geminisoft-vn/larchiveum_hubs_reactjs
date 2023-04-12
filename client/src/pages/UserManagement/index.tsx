import { useEffect, useState } from "react";

import UserService from "src/api/UserService";
import { useAppDispatch } from "src/app/hooks";
import { Button, Pagination, Stack, Table } from "src/components";
import { setPagination } from "src/features/pagination/PaginationSlice";
import { IParams, IUser } from "src/interfaces";

import UserRegisteringForm from "./components/UserRegisteringForm";

const columns = [
	{
		accessor: "id",
		Header: "ID",
	},
	{
		accessor: "displayName",
		Header: "Name",
	},
	{
		accessor: "email",
		Header: "Email",
	},
	{
		accessor: "type",
		Header: "Type",
		Cell: ({ value }) => {
			return (
				<>
					{value < 4 && "User"}
					{value === 4 && "Admin"}
					{value === 5 && "Super Admin"}
				</>
			);
		},
	},
];

const UserManagement = () => {
	const dispatch = useAppDispatch();

	const [
		shouldOpenUserRegistrationFormModal,
		setShouldOpenUserRegistrationFormModal,
	] = useState(false);
	const [data, setData] = useState<IUser[]>([]);
	const [params, setParams] = useState<IParams>({
		page: 1,
		pageSize: 10,
	});

	const load = (_params: IParams) => {
		UserService.getAll(_params).then((res) => {
			if (res.result === "ok") {
				setData(res.data);

				dispatch(setPagination(res.pages));
			}
		});
	};

	useEffect(() => {
		load(params);
	}, [params]);

	return (
		<Stack direction="col" justifyContent="between" gap={2} className="h-full">
			<Stack direction="col">
				<Stack direction="row">
					<Button onClick={() => setShouldOpenUserRegistrationFormModal(true)}>
						Create new user
					</Button>
				</Stack>
				<Table columns={columns} data={data} />
			</Stack>
			<Pagination
				page={params.page}
				setParams={setParams}
				className="self-center"
			/>

			<UserRegisteringForm
				isActive={shouldOpenUserRegistrationFormModal}
				setIsActive={setShouldOpenUserRegistrationFormModal}
			/>
		</Stack>
	);
};

export default UserManagement;
