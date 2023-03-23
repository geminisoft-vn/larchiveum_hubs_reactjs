import CheckList from "@editorjs/checklist";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import Table from "@editorjs/table";

export const EDITOR_TOOLS = {
	header: {
		class: Header,
		inlineToolbar: true,
	},
	list: List,
	linkTool: Link,
	checklist: CheckList,
	quote: Quote,
	image: Image,
	raw: Raw,
	table: Table,
};
