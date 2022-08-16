import React from "react";

const AboutPage = () => {
	return (
		<div className="card-main">
			<div className="card">
				<h5 className="card-header">Featured</h5>
				<div className="card-body">
					<h5 className="card-title">Conversion from XLSX to JSON</h5>
					<p className="card-text">
						Upload your XLSX file and convert them by one click to JSON format
						with sheet name you want
					</p>
					<h5 className="card-title">Notice to XLSX format</h5>
					<p>
						In this converter please don't rename columns because it's convert
						JSON file to use directly 
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
