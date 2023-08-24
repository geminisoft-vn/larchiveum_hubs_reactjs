import { enqueueSnackbar } from "notistack";

const checkExpireJwtToken = (expireDate) => {
	if (Date.now() >= expireDate * 1000) {
		return false;
	}
	return true;
};

const toastNotifications = (message, variant, vertical, horizontal) => {
	enqueueSnackbar(message, {
		variant: variant,
		anchorOrigin: {
			vertical: vertical || "top",
			horizontal: horizontal || "left"
		}
	});
}

export { checkExpireJwtToken, toastNotifications };
