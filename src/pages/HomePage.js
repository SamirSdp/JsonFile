import React from "react";
// import NavBar from "../component/NavBar";
import UploadFile from "../component/UploadFile";

const HomePage = () => {
	return (
		<div className="m-5">
			<div class="card">
				<div class="card-header">
					File Upload
				</div>
				<div class="card-body ">
					
						<UploadFile />
					
				</div>
			</div>
		</div>
	);
};

export default HomePage;
