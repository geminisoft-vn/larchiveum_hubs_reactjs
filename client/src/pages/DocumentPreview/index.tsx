import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DocumentService from "src/api/DocumentService";

const DocumentPreview = () => {
	const { id } = useParams();

	const [document, setDocument] = useState("");

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
			<h3 className="text-center text-2xl font-bold">{document.title}</h3>
			<p className="text-center text-gray-600">{document.description}</p>
			<div dangerouslySetInnerHTML={{ __html: document.content }} />
		</div>
	);
};

export default DocumentPreview;
