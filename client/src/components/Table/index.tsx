import { useTable } from "react-table";

const Table = (props) => {
	const { columns, data } = props;

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	return (
		<div className="relative overflow-x-auto">
			<table
				className="w-full text-left text-sm text-gray-500"
				{...getTableProps()}
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									scope="col"
									className="px-6 py-3 font-bold"
									{...column.getHeaderProps()}
								>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr className="border-b bg-white" {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											className="whitespace-nowrap px-6 py-4 text-gray-900 "
											{...cell.getCellProps()}
										>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
