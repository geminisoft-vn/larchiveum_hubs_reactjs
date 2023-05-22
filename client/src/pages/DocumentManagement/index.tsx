import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/app/hooks";

import { Button, Loader, Stack } from "src/components";
import { getUserInfo } from "src/features/user/selectors";
import { useData } from "src/hooks";

import Documents from "./components/Documents";

const DocumentManagement = (props) => {
	const { t } = useTranslation();

	const user = useAppSelector(getUserInfo);

	const { data: documents, isLoading } = useData(
		`/documents`,
		"GET",
		{
			filter: JSON.stringify([
				{
					operator: "=",
					key: "createdBy",
					value: user.id,
				},
			]),
		},
		() => {},
	);

	return (
		<Stack direction="col" gap={2}>
			<Link to="/home/content/document/form">
				<Button className="self-start bg-blue-500 text-white">
					{`+ ${t(
						"content.DOCUMENT_TAB__DOCUMENT_LIST__DOCUMENT_TAB__ADD_DOCUMENT_BUTTON_LABEL",
					)}`}
				</Button>
			</Link>
			{isLoading ? <Loader /> : <Documents documents={documents} />}
		</Stack>
	);
};

export default DocumentManagement;