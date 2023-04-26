import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button, Stack } from "src/components";

import Documents from "./components/Documents";

const DocumentManagement = (props) => {
	const { t } = useTranslation();

	return (
		<Stack direction="col" gap={2}>
			<Link to="/home/content/document/form">
				<Button className="self-start bg-blue-500 text-white">
					{`+ ${t(
						"content.DOCUMENT_TAB__DOCUMENT_LIST__DOCUMENT_TAB__ADD_DOCUMENT_BUTTON_LABEL",
					)}`}
				</Button>
			</Link>
			<Documents />
		</Stack>
	);
};

export default DocumentManagement;
