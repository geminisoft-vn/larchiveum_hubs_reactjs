const checkExpireJwtToken = (expireDate) => {
	if (Date.now() >= expireDate * 1000) {
		return false;
	}
	return true;
};

export { checkExpireJwtToken };
