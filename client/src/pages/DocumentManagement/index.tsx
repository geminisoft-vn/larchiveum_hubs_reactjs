import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button, Stack } from "src/components";

import Documents from "./components/Documents";

const DocumentManagement = (props) => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const [isVisiableDocumentCreateDetail, setIsVisiableDocumentCreateDetail] =
		useState(false);
	const [isVisiableDocumentEditDetail, setIsVisiableDocumentEditDetail] =
		useState(false);
	const [document, setDocument] = useState(null);

	const handleOpenDocumentCreateDetail = () => {
		navigate("/home/content/document/form");
	};

	return (
		<Stack direction="col" gap={2}>
			<Button
				onClick={handleOpenDocumentCreateDetail}
				className="self-start bg-blue-500 text-white"
			>
				{`+ ${t(
					"content.DOCUMENT_TAB__DOCUMENT_LIST__DOCUMENT_TAB__ADD_DOCUMENT_BUTTON_LABEL",
				)}`}
			</Button>
			<Documents />
		</Stack>
	);
};

export default DocumentManagement;
