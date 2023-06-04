
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

import DocumentService from "src/api/DocumentService";
import { IDocument } from "src/interfaces";

const DocumentPreview = () => {
	const { id } = useParams();

	const [document, setDocument] = useState<IDocument | null>(null);

	const load = () => {
		DocumentService.getOne(id).then((res) => {
			if (res.result === "ok") {
				setDocument(res.data);
			}
		});
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<div className="h-full w-full p-2">
			<h3 className="text-center text-2xl font-bold">{document?.title}</h3>
			<p className="text-center text-gray-600">{document?.description}</p>
			<div
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(document?.content),
				}}
			/>
		</div>
	);
};

export default DocumentPreview;