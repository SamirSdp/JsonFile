import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as xlsx from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

const fileTypes = ["XLSX"];

const UploadFile = () => {
	// USe 3s State to save data
	// First state Save input Xlsx To Json File but
	// This Json File is Xlsx base Json File
	const [jsonFile, setJsonFile] = useState([]);
	// THis State Use perfect Json File means to use in Project
	const [convertFile, setConvertFile] = useState([]);
	// This is download Json file Name As a Xlsx file
	const [fileName, setFileName] = useState();
	const [workSheet, setWorkSheet] = useState();

	// In Xlsx file load to the user and convert in json
	// Useing fileReader with xlsx pakages
	const handleChange = (xlFile) => {
		const fileName = xlFile.name;
		const DownloadFileName = fileName.split(".");
		setFileName(DownloadFileName[0]);
		const reader = new FileReader();
		reader.onload = (xlFile) => {
			const data = xlFile.target.result;
			const workbook = xlsx.read(data, { type: "array" });
			const sheetName = workbook.SheetNames;
			// Suppose in Xlsx file have muiltiple sheets
			if (sheetName.length > 0) {
				let jsonList = [];
				// eslint-disable-next-line array-callback-return
				sheetName.map((item) => {
					const worksheet = workbook.Sheets[item];
					const json = xlsx.utils.sheet_to_json(worksheet);
					setWorkSheet(json);
					const sheetObject = { sheetName: item, json: json };
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
	const convert = (jsonFile) => {
		const convertData = jsonFile.map((object) => {
			var keys = Object.keys(object);
			// eslint-disable-next-line array-callback-return
			keys.map((oldKeys) => {
				const newKeys = camelize(oldKeys);
				object[newKeys] = object[oldKeys];
				delete object[oldKeys];
			});
			return object;
		});
		setConvertFile(convertData);
		console.log("convertData", convertData);
	};
	return (
		<div className="file-main m-1 p-2 mt-3">
			<span className="file-enter-text fs-2 px-4 mb-3 text text-decoration-underline">Select Xlsx File</span>
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
												{workSheet.length > 0 ? (
													<a
														className=""
														key={index}
														// It's Use to download to convert in url
														href={`data:text/json;charset=utf-8,${encodeURIComponent(
															JSON.stringify(convertFile)
														)}`}
														download={`${fileName} ${item.sheetName}.json`}>
														<button
															className="btn-down text-wrap"
															onClick={() => convert(item.json)}>
															{`${item.sheetName}.json`}
														</button>
													</a>
												) : (
													<h3>No Sheet available please check xlsx file</h3>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default UploadFile;
