import { createContext, useContext } from "react";

const FormErrorProviderContext = createContext({
	onError: (error) => error?.message,
});

export default function FormErrorProvider({ onError, children }) {
	return (
		<FormErrorProviderContext.Provider value={{ onError }}>
			{children}
		</FormErrorProviderContext.Provider>
	);
}

export const useFormError = () => {
	const errorCtx = useContext(FormErrorProviderContext);
	return errorCtx?.onError;
};
