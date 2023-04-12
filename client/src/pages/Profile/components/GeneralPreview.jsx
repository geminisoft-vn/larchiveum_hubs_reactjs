import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "src/app/hooks";
import { Button, FormItem, TextInput } from "src/components";
import { getUserInfo } from "src/features/user/selectors";

import NameEditionModal from "./NameEditionModal";

const GeneralPreview = () => {
	const { t } = useTranslation();
	const user = useAppSelector(getUserInfo);

	const { register, setValue } = useForm({
		defaultValues: {
			displayName: user.displayName || "",
		},
	});

	const [shouldOpenNameEditionModal, setShouldOpenNameEditionModal] =
		useState(false);

	useEffect(() => {
		setValue("displayName", user.displayName);
	}, [setValue, user.displayName]);

	return (
		<>
			<div className="flex flex-1 flex-col rounded-lg border">
				<div className="border-b p-2 text-center">
					{t("profile.GENERAL_PANEL__TITLE")}
				</div>
				<div
					className="flex items-center p-2"
					style={{
						height: 512,
					}}
				>
					<FormItem
						label="Display name"
						renderInput={() => (
							<TextInput readOnly {...register("displayName")} />
						)}
					/>
				</div>
				<div className="flex justify-center border-t p-2">
					<Button onClick={() => setShouldOpenNameEditionModal(true)}>
						{t("__BUTTON__.CHANGE")}
					</Button>
				</div>
			</div>
			{shouldOpenNameEditionModal && (
				<NameEditionModal
					isActive={shouldOpenNameEditionModal}
					setIsActive={setShouldOpenNameEditionModal}
				/>
			)}
		</>
	);
};

export default GeneralPreview;
