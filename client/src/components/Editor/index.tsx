import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";

import { EDITOR_TOOLS } from "./Tools";

type Props = {};

const Editor: React.FC<Props> = () => {
	useEffect(() => {
		const editor = new EditorJS({
			/**
			 * Id of Element that should contain Editor instance
			 */
			holder: "LARCHIVEUM__EDITOR",

			tools: EDITOR_TOOLS,
		});

		editor.isReady
			.then(() => console.log("EditorJS is ready!"))
			.catch(() => console.error("EditorJS started failed!"));
	}, []);

	return <div id="LARCHIVEUM__EDITOR" className="border rounded w-full" />;
};

export default Editor;
