// @ts-nocheck

import React, { useEffect, useState } from "react";

import UserService from "src/api/UserService";

const CallbackNaverOAuthPage = (props) => {
	const [error, setError] = useState(null);

	useEffect(() => {
		const { hash } = location;
		if (hash && hash !== "error" && hash.length > 0) {
			const search = hash.substring(1); // remove #
			const obj = JSON.parse(
				`{"${search.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
				(key, value) => (key === "" ? value : decodeURIComponent(value)),
			);
			/**
                access_token: ""
                expires_in: "3600"
                state: ""
                token_type: "bearer"
            */
			const data = { nvtoken: obj.access_token };
			UserService.naverLogin(data)
				.then((response) => {
					if (response.result == "ok") {
						window.opener.window.location.href = "/";
						window.close();
					} else {
						setError(response.error);
					}
				})
				.catch((error) => {
					setError(error);
				});
		} else {
			console.log("Error");
		}
	}, []);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{!error ? (
				<span>Authenticating...</span>
			) : (
				<span>Authentication Error: {error.toString()}</span>
			)}
		</div>
	);
};

export default CallbackNaverOAuthPage;
