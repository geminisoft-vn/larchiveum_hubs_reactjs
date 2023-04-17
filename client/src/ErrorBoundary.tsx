import React from "react";

interface Props {
	children: JSX.Element | JSX.Element[];
}

interface State {
	hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log(error);
		console.log(errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Some thing went wrong</h1>;
		}
		return this.props.children;
	}
}
