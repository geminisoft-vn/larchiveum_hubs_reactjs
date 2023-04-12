import { useTranslation } from "react-i18next";
import {
	DeleteOutlined,
	EyeOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";

import { Button, Stack } from "src/components";

const Document = (props) => {
	const {
		document,
		handleGotoViewDocument,
		handleGoToDocumentForm,
		openDeleteDocumentPopup,
	} = props;
	const { t } = useTranslation();
	return (
		<div className="flex items-center justify-between rounded-lg border p-4">
			<Stack direction="col">
				<h3 className="text-2xl font-bold">{document.title}</h3>
				<p style={{ fontSize: "0.9em", color: "#aaaaaa" }}>
					{document.description}
				</p>
			</Stack>
			<div className="flex items-center gap-2">
				<Button
					beforeIcon={<EyeOutlined />}
					onClick={() => {
						handleGotoViewDocument(document.id);
					}}
					className="bg-green-700 text-white"
				>
					{t("content.DOCUMENT_TAB__DOCUMENT_LIST__PREVIEW_BUTTON_LABEL")}
				</Button>
				<Button
					beforeIcon={<UnorderedListOutlined />}
					onClick={() => {
						handleGoToDocumentForm(document.id);
					}}
					className="bg-yellow-700 text-white"
				>
					{t("content.DOCUMENT_TAB__DOCUMENT_LIST__EDIT_BUTTON_LABEL")}
				</Button>
				<Button
					beforeIcon={<DeleteOutlined />}
					onClick={() => {
						openDeleteDocumentPopup(document.id);
					}}
					className="bg-red-700 text-white"
				>
					{t("content.DOCUMENT_TAB__DOCUMENT_LIST__DELETE_BUTTON_LABEL")}
				</Button>
			</div>
		</div>
	);
};
export default Document;
