import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button, FormItem, TextInput } from "src/components";
import UserService from "src/api/UserService";
import Store from "src/utilities/store";
import validator from "src/utilities/validator";

const GeneralPreview = (props) => {
	const { handleChange } = props;

	const user = Store.getUser();
	const { t } = useTranslation();
	const [displayName, setDisplayName] = useState(props?.displayName);
	const [isSaving, setIsSaving] = useState(false);
	const [isValidated, setIsValidated] = useState(true);

	const handleInputChange = (e) => {
		const { value } = e.target;
		setDisplayName(value);

		if (validator.validDisplayName(value)) {
			setIsValidated(true);
		} else {
			setIsValidated(false);
		}
	};

	const handleChangeDisplayName = () => {
		setIsSaving(true);
		const store = JSON.parse(localStorage.getItem("___hubs_store"));
		// const user = Store.getUser();

		// -> save to local
		// -> check user
		//      + if have user -> call API change update user
		// -> set displayName

		// -> save to local
		store.profile.displayName = displayName;
		localStorage.setItem("___hubs_store", JSON.stringify(store));

		// check user
		if (user) {
			// + if have user -> call API change update user
			UserService.update(user.id, {
				displayName,
			})
				.then((response) => {
					if (response.result === "ok") {
						Store.setUser(response.data);
						if (handleChange) {
							handleChange(displayName);
						}
					} else {
						toast.error(t("profile.GENERAL_PANEL__ERROR"), { autoClose: 3000 });
					}
					setIsSaving(false);
				})
				.catch(() => {
					toast.error(t("profile.GENERAL_PANEL__ERROR"), { autoClose: 3000 });
					setIsSaving(false);
				});
		} else {
			// handleResult(displayName);
			setIsSaving(false);
		}
	};

	return (
		<div className="border rounded-lg flex-1 flex flex-col">
			<div className="border-b p-2 text-center">
				{t("profile.GENERAL_PANEL__TITLE")}
			</div>
			<div
				className="p-2 flex items-center"
				style={{
					height: 512,
				}}
			>
				<FormItem
					label="Display name"
					renderInput={() => (
						<TextInput value={displayName} onChange={handleInputChange} />
					)}
				/>
			</div>
			<div className="border-t p-2 flex justify-center">
				<Button
					onClick={handleChangeDisplayName}
					disabled={isSaving || !isValidated}
				>
					{t("profile.GENERAL_PANEL__SAVE")}
				</Button>
			</div>
		</div>
	);
};

export default GeneralPreview;
