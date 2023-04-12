import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import UserService from "src/api/UserService";
import { useAppDispatch } from "src/app/hooks";
import { FormItem, Modal, TextInput } from "src/components";
import { showToast } from "src/features/toast/ToastSlice";

const UserRegisteringForm = (props) => {
	const { isActive, setIsActive } = props;

	const dispatch = useAppDispatch();

	const { t } = useTranslation();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			displayName: "",
			email: "",
			password: "",
			repassword: "",
		},
	});

	const handleCloseModal = () => {
		setIsActive(false);
	};

	const handleSendEmail = handleSubmit((data) => {
		UserService.signupWithEmail({ ...data, type: 4 })
			.then((res) => {
				if (res.result === "ok") {
					dispatch(
						showToast({
							type: "success",
							message: t(`__TOAST__.SUCCESS`),
						}),
					);
				}
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
				handleCloseModal();
			});
	});

	return (
		<Modal
			title="Create New User"
			isActive={isActive}
			setIsActive={setIsActive}
			actions={[
				{
					text: "Create",
					className: "bg-blue-700 text-white",
					callback: handleSendEmail,
				},
				{
					text: "Close",
					callback: handleCloseModal,
				},
			]}
		>
			<FormItem
				label={t("signup.DISPLAY_NAME_LABEL")}
				renderInput={() => (
					<TextInput {...register("displayName")} placeholder="" className="" />
				)}
			/>

			<FormItem
				label={t("signup.EMAIL_LABEL")}
				renderInput={() => (
					<TextInput {...register("email")} placeholder="" className="" />
				)}
			/>

			<FormItem
				label={t("signup.PASSWORD_LABEL")}
				renderInput={() => (
					<TextInput
						{...register("password")}
						type="password"
						placeholder=""
						className=""
					/>
				)}
			/>

			<FormItem
				label={t("signup.RE_PASSWORD_LABEL")}
				renderInput={() => (
					<TextInput
						{...register("repassword")}
						type="password"
						placeholder=""
						className=""
					/>
				)}
			/>
		</Modal>
	);
};

export default UserRegisteringForm;
