import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import UserService from "src/api/UserService";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { FormItem, Modal, Stack, TextInput, Typography } from "src/components";
import { showToast } from "src/features/toast/ToastSlice";
import { getUserInfo } from "src/features/user/selectors";
import { updateUser } from "src/features/user/UserSlice";

const NameEditionModal = (props) => {
	const { isActive, setIsActive } = props;

	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const user = useAppSelector(getUserInfo);

	const { handleSubmit, register } = useForm({
		defaultValues: {
			displayName: user.displayName || "",
		},
	});

	const handleSave = handleSubmit((data) => {
		if (user.id) {
			UserService.update(user.id, {
				displayName: data.displayName,
			})
				.then((res) => {
					if (res.result === "ok") {
						dispatch(
							updateUser({
								displayName: res.data.displayName,
							}),
						);
						setIsActive(false);
					}
				})
				.catch(() => {
					dispatch(
						showToast({
							type: "error",
							message: t("profile.GENERAL_PANEL__ERROR"),
						}),
					);
				});
		}
	});

	const handleCloseModal = () => {
		setIsActive(false);
	};

	return (
		<Modal
			isActive={isActive}
			setIsActive={setIsActive}
			title="Nickname Change"
			minHeight={256}
			maxHeight={400}
			actions={[
				{
					text: t("profile.POPUP_CHANGE_AVATAR__SAVE"),
					className: "bg-blue-500 text-white",
					callback: () => {
						handleSave();
					},
				},
				{
					text: t("profile.POPUP_CHANGE_AVATAR__CANCEL"),
					className: "btn2",
					callback: () => {
						handleCloseModal();
					},
				},
			]}
		>
			<Stack
				direction="col"
				alignItems="center"
				justifyContent="center"
				gap={2}
				className="h-full p-4"
			>
				<FormItem
					label="Nickname"
					renderInput={() => <TextInput {...register("displayName")} />}
				/>
				<Typography>
					Please enter a name consisting of 3 to 32 Korean characters,
					alphabets, numbers. hyphens (-), underscrores (_), and tidles (~).
				</Typography>
			</Stack>
		</Modal>
	);
};

export default NameEditionModal;
