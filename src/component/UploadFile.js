import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as xlsx from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

const fileTypes = ["XLSX"];

const UploadFile = () => {
	//state
	// First state Save input Xlsx To Json File but
	// This Json File is Xlsx base Json File
	const [jsonFile, setJsonFile] = useState([]);
	// THis State Use perfect Json File means to use in Project
	const [convertFile, setConvertFile] = useState(null);
	// This is download Json file Name As a Xlsx file
	const [isCopied, setIsCopied] = useState(false);
	// In Xlsx file load to the user and convert in json
	// Using fileReader with xlsx packages
	const handleChange = (xlFile) => {
		// const fileName = xlFile.name;
		// const DownloadFileName = fileName.split(".");

		const reader = new FileReader();
		reader.onload = (xlFile) => {
			const data = xlFile.target.result;
			const workbook = xlsx.read(data, { type: "array" });
			const sheetName = workbook.SheetNames;

			// Suppose in Xlsx file have multiple sheets
			if (sheetName.length > 0) {
				let jsonList = [];
				// eslint-disable-next-line array-callback-return
				sheetName.map((item) => {
					const worksheet = workbook.Sheets[item];
					const json = xlsx.utils.sheet_to_json(worksheet);
					const sheetObject = {
						sheetName: item,
						json: json,
						flag: json.length > 0 ? true : false,
					};
					jsonList.push(sheetObject);
				});
				setJsonFile(jsonList);
			}
		};
		reader.readAsArrayBuffer(xlFile);
	};
	// Xlsx/Json file is not use in project because keys not working in project
	// Xlsx/Json file keys having space between each other
	// example ( "customer name": "jon" ) but in react keys space is not allow
	function camelize(str) {
		return str
			.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
				return index === 0 ? word.toLowerCase() : word.toUpperCase();
			})
			.replace(/\s+/g, "");
	}
	const convert = (jsonFile, jsonFileName) => {
		const convertData = jsonFile.map((object) => {
			var keys = Object.keys(object);
			// eslint-disable-next-line array-callback-return
			keys.map((oldKeys) => {
				const newKeys = camelize(oldKeys);
				// if condition use because xlsx sheet
				// object are same then old object not delete
				if (newKeys !== oldKeys) {
					object[newKeys] = object[oldKeys];
					delete object[oldKeys];
				} else {
					object[newKeys] = object[oldKeys];
				}
			});
			return object;
		});

		setConvertFile({ jsonFileName: jsonFileName, jsonFile: convertData });
		console.log("convertFile:", convertFile);
	};
	const onCopyText = () => {
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};
	return (
		<div className="file-main m-1 p-2 mt-3">
			<span className="file-enter-text fs-2 px-4 mb-3 text text-decoration-underline">
				Select Xlsx File
			</span>
			<div className="file mb-2 p-2 px-5">
				<FileUploader
					handleChange={(xlFile) => {
						handleChange(xlFile);
					}}
					name="file"
					types={fileTypes}
				/>
			</div>
			<div className="download-file mt-4">
				{jsonFile.length > 0 ? (
					<div className="card">
						<h5 className="card-header">Download</h5>
						<div className="card-body">
							<div className="main-grid">
								{jsonFile.map((item, index) => {
									return (
										<div key={index}>
											<div className="btn-content py-2 px-3 mt-0 ">
												<button
													disabled={item.json.length > 0 ? false : true}
													className="btn-down text-wrap"
													onClick={() => convert(item.json, item.sheetName)}>
													{item.json.length > 0
														? `${item.sheetName}.json`
														: `No data ${item.sheetName}`}
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				) : null}
			</div>
			<div>
				{convertFile && (
					<div className="card  m-4">
						<h5 className="card-header">Json Data</h5>

						<div className="copy-download p-2">
							<CopyToClipboard
								text={JSON.stringify(convertFile?.jsonFile)}
								onCopy={onCopyText}>
								<button className="btn-copy">copy</button>
							</CopyToClipboard>

							<a
								className="btn-download"
								// It's Use to download to convert in url
								href={`data:text/json;charset=utf-8,${encodeURIComponent(
									JSON.stringify(convertFile?.jsonFile)
								)}`}
								download={`${convertFile?.jsonFileName}.json`}>
								<button className=" btn-download mx-2">download</button>
							</a>
						</div>

						{isCopied && (
							<div
								className={`alert alert-primary copy-feedback ${
									isCopied ? "active" : null
								} `}
								role="alert">
								A simple primary alert—check it out!
							</div>
						)}

						<pre className="pre">
							{JSON.stringify(convertFile?.jsonFile, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadFile;
