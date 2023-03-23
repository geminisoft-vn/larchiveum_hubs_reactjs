import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import { EDITOR_TOOLS } from "./Tools";

const Editor = () => {
	const editorRef = useRef<EditorJS | null>(null);

	useEffect(() => {
		const editor = new EditorJS({
			/**
			 * Id of Element that should contain Editor instance
			 */
			holder: "LARCHIVEUM__EDITOR",

			tools: EDITOR_TOOLS,
		});

		if (!editorRef.current) {
			editorRef.current = editor;
		}

		return () => {
			if (editorRef.current) {
				editorRef.current = null;
			}
		};
	}, []);

	return <div id="LARCHIVEUM__EDITOR" className="border-2 rounded w-full" />;
};

export default Editor;
