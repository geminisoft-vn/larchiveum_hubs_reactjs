/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Trans } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Empty,
	Layout,
	Menu,
	Progress,
	Row,
	Spin,
	Typography,
} from "antd";
import axios from "axios";
import PropTypes from "prop-types";

import MediaService from "src/utilities/apiServices/MediaService";

import "./UploadFileModal.scss";

class UploadFileModal extends React.Component {
	constructor(props) {
		super(props);
		this.el = document.createElement("div");
		this.state = {
			uploading: false,
			file: undefined,
			error: undefined,
			progress: 0,
			visiable: props.visiable,
		};
	}

	static propTypes = {
		file: PropTypes.shape({
			name: PropTypes.string,
		}),
		progress: PropTypes.number,
		visiable: PropTypes.bool,
		style: PropTypes.object,
		onCancel: PropTypes.func,
		onClose: PropTypes.func,
	};

	componentDidMount() {
		document.body.appendChild(this.el);
	}

	componentWillUnmount() {
		document.body.removeChild(this.el);
	}

	upload(file, callback) {
		this.setState({
			...this.state,
			file,
			uploading: true,
			error: undefined,
			progress: 0,
			visiable: true,
		});
		this.cancellation = axios.CancelToken.source();
		MediaService.upload(
			file,
			(progress) => {
				this.setState({
					...this.state,
					progress,
				});
			},
			this.cancellation
		)
			.then((res) => {
				this.setState({
					...this.state,
					uploading: false,
					visiable: false,
				});
				callback && callback(null, res.data);
			})
			.catch((error) => {
				this.setState({
					...this.state,
					uploading: false,
					error: error.toString(),
				});
				callback && callback(error);
			});
	}

	open() {
		this.setState({
			...this.state,
			visiable: true,
		});
	}

	close() {
		this.setState({
			...this.state,
			file: undefined,
			progress: 0,
			error: undefined,
			visiable: false,
			uploading: false,
		});
	}

	cancel() {
		this.cancellation?.cancel("processing canceled");
	}

	render() {
		return ReactDOM.createPortal(
			<div
				className="upload-file-modal"
				style={{ display: this.state.visiable ? "flex" : "none" }}
			>
				<div className="modal-content" style={{ ...this.props.style }}>
					<Row>
						<Col span={24}>
							<Button
								type="text"
								icon={<CloseOutlined />}
								disabled={this.state.uploading}
								onClick={() => {
									this.close();
									this.props.onClose && this.props.onClose();
								}}
								style={{ float: "right", width: "30px" }}
							/>
						</Col>
						<Col span={24}>
							<div
								style={{
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap",
									height: "40px",
									width: "auto",
								}}
							>
								{this.state.file?.name}
							</div>
						</Col>
						<Col span={24}>
							<Progress
								percent={this.state.progress}
								style={{ padding: "0x", margin: "0px" }}
							/>
						</Col>
						<Col
							span={24}
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: "10px",
							}}
						>
							{this.state.error ? (
								<Typography.Text style={{ float: "left", color: "red" }}>
									{" "}
									{this.state.error}{" "}
								</Typography.Text>
							) : (
								<>
									{this.state.progress >= 100 ? (
										<Typography.Text style={{ float: "left", color: "green" }}>
											<Trans i18nKey="content.DOCUMENT_TAB__UPLOAD_PROGRESS_MODAL__COMPLETED_MESSAGE" />
										</Typography.Text>
									) : (
										<Typography.Text style={{ float: "left" }}>
											<Trans i18nKey="content.DOCUMENT_TAB__UPLOAD_PROGRESS_MODAL__UPLOADING_MESSAGE" />
										</Typography.Text>
									)}
								</>
							)}
							<Button
								danger
								disabled={!this.state.uploading || this.state.progress == 100}
								onClick={() => {
									this.cancel();
									this.close();
									this.props.onCancel && this.props.onCancel();
								}}
								style={{ float: "right" }}
							>
								<Trans i18nKey="content.DOCUMENT_TAB__UPLOAD_PROGRESS_MODAL__CANCEL_BUTTON_LABEL" />
								{/* {t("content.DOCUMENT_TAB__UPLOAD_PROGRESS_MODAL__CANCEL_BUTTON_LABEL")} */}
							</Button>
						</Col>
					</Row>
				</div>
			</div>,
			this.el
		);
	}
}

export default UploadFileModal;
