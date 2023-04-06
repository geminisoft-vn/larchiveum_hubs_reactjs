/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// @ts-nocheck
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

import { Button } from "src/components";

import DocumentCreateDetail from "./components/DocumentCreateDetail";
import DocumentEditDetail from "./components/DocumentEditDetail";
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

	const handleOpenDocumentEditDetail = function (document) {
		setDocument(document);
		setIsVisiableDocumentEditDetail(true);
	};

	const handleBackToDocumentList = function () {
		setIsVisiableDocumentCreateDetail(false);
		setIsVisiableDocumentEditDetail(false);
		setDocument(null);
	};

	return (
		<div style={{ position: "relative" }}>
			<div>
				<div span={24} style={{ padding: "10px 0px" }}>
					<Button
						type="primary"
						style={{ float: "right" }}
						onClick={handleOpenDocumentCreateDetail}
					>
						{`+ ${t(
							"content.DOCUMENT_TAB__DOCUMENT_LIST__DOCUMENT_TAB__ADD_DOCUMENT_BUTTON_LABEL"
						)}`}
					</Button>
				</div>
			</div>
			{!isVisiableDocumentCreateDetail && !isVisiableDocumentEditDetail && (
				<Documents onOpenDocumentEditDetail={handleOpenDocumentEditDetail} />
			)}
			{isVisiableDocumentCreateDetail && (
				<div
					style={{
						position: "absolute",
						top: 0,
						background: "white",
						width: "100%",
					}}
				>
					<DocumentCreateDetail onBack={handleBackToDocumentList} />
				</div>
			)}
			{isVisiableDocumentEditDetail && (
				<div
					style={{
						position: "absolute",
						top: 0,
						background: "white",
						width: "100%",
					}}
				>
					<DocumentEditDetail
						documentId={document.id}
						onBack={handleBackToDocumentList}
					/>
				</div>
			)}
		</div>
	);
};

export default DocumentManagement;
