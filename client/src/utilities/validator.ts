// @ts-nocheck
/* eslint-disable */

import validator from "validator";

function validDisplayName(displayName, pattern) {
	if (!pattern) {
		pattern = /^[a-zA-Z가-힇ㄱ-ㅎㅏ-ㅣ一-龥0-9_~ -]{2,32}$/;
	}
	return pattern.test(displayName);
}

function validLength(text, min, max) {
	return validator.isLength(text || "", min, max);
}

export default {
	validDisplayName,
	validLength,
};
