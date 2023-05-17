import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";

// import PopupCreateDocument from "./PopupCreateDocument";
import DocumentService from "src/api/DocumentService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { closePopup, openPopup } from "src/features/popup/PopupSlide";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserInfo } from "src/features/user/selectors";

import Document from "./Document";

const Documents = (props) => {
	const { documents } = props;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector(getUserInfo);

	const { t } = useTranslation();

	const handleClosePopup = () => {
		dispatch(closePopup());
	};

	const handleDeleteDocument = (id) => {
		DocumentService.delete(id)
			.then(() => {
				dispatch(
					showToast({
						type: "success",
						message: t(`__TOAST__.SUCCESS`),
					}),
				);
			})
			.catch(() => {
				dispatch(
					showToast({
						type: "error",
						message: t(`__TOAST__.ERROR`),
					}),
				);
			})
			.finally(() => {
				handleClosePopup();
			});
	};

	const openDeleteDocumentPopup = useCallback((id) => {
		dispatch(
			openPopup({
				isActive: true,
				title: "Delete Document",
				content: "Are you sure you want to delete this document?",
				actions: [
					{
						text: t(`__BUTTON__.DELETE`),
						danger: true,
						callback: () => {
							handleDeleteDocument(id);
						},
					},
					{
						text: t(`__BUTTON__.CLOSE`),
						callback: () => {
							handleClosePopup();
						},
					},
				],
			}),
		);
	}, []);

	const handleGoToDocumentForm = useCallback((documentId) => {
		navigate(`/home/content/document/form/${documentId}`);
	}, []);

	return documents.length === 0 ? (
		<Empty
			image={Empty.PRESENTED_IMAGE_SIMPLE}
			style={{ marginTop: "100px" }}
		/>
	) : (
		<div className="flex flex-col gap-2">
			{documents.map((document) => (
				<Document
					key={document.id}
					document={document}
					handleGoToDocumentForm={handleGoToDocumentForm}
					openDeleteDocumentPopup={openDeleteDocumentPopup}
				/>
			))}
		</div>
	);
};

export default Documents;
