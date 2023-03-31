/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// @ts-nocheck
/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";

// import PopupCreateDocument from "./PopupCreateDocument";
import DocumentService from "src/api/DocumentService";
import { CONTENT_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

import Document from "./Document";

const Documents = (props) => {
	const navigate = useNavigate();

	const [listDocument, setListDocument] = useState([]);

	useEffect(() => {
		loadDocuments();
	}, []);

	function loadDocuments() {
		DocumentService.getAll({
			sort: "-createdAt",
			filter: JSON.stringify([
				{
					operator: "=",
					key: "createdBy",
					value: Store.getUser()?.id,
				},
			]),
		})
			.then((res) => {
				const documents = res.data.items;
				setListDocument(documents);
			})
			.catch((error) => {});
	}

	const handleDeleteDocument = useCallback((documentId) => {
		// handleDeleteDocument(documentId);
	}, []);

	const handleGoToDocumentForm = useCallback((documentId) => {
		navigate(`/home/content/document-form/${documentId}`);
	}, []);

	// function handleDeleteDocument(documentId) {
	// 	// DocumentService.delete(documentId)
	// 	// 	.then((document) => {
	// 	// 		setListDocument(listDocument.filter((q) => q.id != documentId));
	// 	// 		setDeletingDocumentId(null);
	// 	// 	})
	// 	// 	.catch((error) => {
	// 	// 		setDeletingDocumentId(null);
	// 	// 	});
	// }

	const handleGotoViewDocument = useCallback((documentId) => {
		window.open(`${CONTENT_ROOT}/document?id=${documentId}`);
	}, []);

	return (
		<div>
			{listDocument.length <= 0 ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					style={{ marginTop: "100px" }}
				/>
			) : (
				<div className="flex flex-col gap-2">
					{listDocument.map((document) => (
						<Document
							key={document.id}
							document={document}
							handleGotoViewDocument={handleGotoViewDocument}
							handleGoToDocumentForm={handleGoToDocumentForm}
							handleDeleteDocument={handleDeleteDocument}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Documents;
