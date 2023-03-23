/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
	DeleteOutlined,
	EyeOutlined,
	LoadingOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Empty, Layout, Menu, Row, Spin } from "antd";

// import PopupCreateDocument from "./PopupCreateDocument";
import DocumentService from "src/utilities/apiServices/DocumentService";
import { CONTENT_ROOT } from "src/utilities/constants";
import Store from "src/utilities/store";

import Document from "./Document";

const { Header, Content, Footer, Sider } = Layout;

export default function (props) {
	const { t } = useTranslation();
	const { onOpenDocumentEditDetail } = props;
	const [isOpenPopupCreate, setIsOpenPopupCreate] = useState(false);
	const [deletingDocumentId, setDeletingDocumentId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [listDocument, setListDocument] = useState([]);
	const [params, setParams] = useState({
		sort: "-createdAt",
		filter: JSON.stringify([
			{
				operator: "=",
				key: "createdBy",
				value: Store.getUser()?.id,
			},
		]),
	});

	useEffect(() => {
		load();
	}, []);

	function load() {
		setIsLoading(true);
		DocumentService.getAll(params)
			.then((res) => {
				const documents = res.data.items;
				setListDocument(documents);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
			});
	}

	function handleDeleteDocument(documentId) {
		setDeletingDocumentId(documentId);
		DocumentService.delete(documentId)
			.then((document) => {
				setListDocument(listDocument.filter((q) => q.id != documentId));
				setDeletingDocumentId(null);
			})
			.catch((error) => {
				setDeletingDocumentId(null);
			});
	}

	function handleGotoViewDocument(documentId) {
		window.open(`${CONTENT_ROOT}/document?id=${documentId}`);
	}

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
						<Document key={document.id} document={document} />
					))}
				</div>
			)}
		</div>
	);
}
