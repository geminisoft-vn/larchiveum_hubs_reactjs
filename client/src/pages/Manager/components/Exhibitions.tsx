import { useTranslation } from "react-i18next";

import ExhibitionsService from "src/api/ExhibitionsService";
import { Button, Stack, Typography } from "src/components";
import { IExhibition } from "src/interfaces";
import Store from "src/utilities/store";

import Exhibition from "./Exhibition";

type Props = {
	exhibitions: IExhibition[];
};

const Exhibitions = (props: Props) => {
	const { exhibitions } = props;
	const { t } = useTranslation();

	const openPopupExhibition = () => {};

	const openPopupCustomMedia = () => {};

	const getSceneThumnail = () => "";

	const openPopupPublic = () => {};
	const setExhibitionType = () => {};
	const openPopupCloseRoom = () => {};
	const openPopupOpenRoom = () => {};
	const openDeleteRoom = () => {};

	return (
		<Stack direction="col" gap={2}>
			<Typography>{t("manager.LIST_EXHIBITION")}</Typography>
			{/* <Button
				className="btn btn-create"
				onClick={() => {
					// openPopupExhibition();
					// setExhibitionType("create");
				}}
			>
				<img src={AddIcon} />
			</Button> */}
			{exhibitions &&
				exhibitions.map((exhibition) => {
					console.log("🚀 ---------------------------------------------------------------🚀");
					console.log("🚀 ~ file: index.tsx:803 ~ {exhibitions.data.map ~ exhibition: ", exhibition);
					console.log("🚀 ---------------------------------------------------------------🚀");
					return (
						<Exhibition
							key={exhibition.id}
							isUnavailable={!!exhibition.room}
							exhibition={exhibition}
							openPopupCustomMedia={openPopupCustomMedia}
							getSceneThumnail={getSceneThumnail}
							openPopupPublic={openPopupPublic}
							openPopupExhibition={openPopupExhibition}
							setExhibitionType={setExhibitionType}
							openPopupCloseRoom={openPopupCloseRoom}
							openPopupOpenRoom={openPopupOpenRoom}
							openDeleteRoom={openDeleteRoom}
						/>
					);
				})}
		</Stack>
	);
};

export default Exhibitions;
