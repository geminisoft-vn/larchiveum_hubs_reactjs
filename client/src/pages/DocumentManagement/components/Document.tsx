import { useTranslation } from "react-i18next";

import { Button } from "src/components";

const Document = (props) => {
	const { document } = props;
	const { t } = useTranslation();
	return (
		<div className="flex items-center justify-between border-2 rounded-lg p-4">
			<div>
				<div>
					<div>{document.title}</div>
				</div>
				<div>
					<div style={{ fontSize: "0.9em", color: "#aaaaaa" }}>
						{document.description}
					</div>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button
					onClick={() => {
						handleGotoViewDocument(document.id);
					}}
				>
					{t("content.DOCUMENT_TAB__DOCUMENT_LIST__PREVIEW_BUTTON_LABEL")}
				</Button>
				<Button
					onClick={() => {
						onOpenDocumentEditDetail(document);
					}}
				>
					{t("content.DOCUMENT_TAB__DOCUMENT_LIST__EDIT_BUTTON_LABEL")}
				</Button>
				<Button
					onClick={() => {
						handleDeleteDocument(document.id);
					}}
				>
					{t("content.DOCUMENT_TAB__DOCUMENT_LIST__DELETE_BUTTON_LABEL")}
				</Button>
			</div>
		</div>
	);
};
export default Document;
