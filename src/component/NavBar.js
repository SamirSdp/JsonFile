import React from "react";

const NavBar = () => {
	return (
		<nav  className="navbar navbar-expand-lg bg-light sticky-top">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">File Converter</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link btn" role="button" aria-current="page" href="/">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link btn" role="button" href="/">About</a>
						</li>
						<li className="nav-item">
							<a className="nav-link btn" role="button" href="/">Pricing</a>
						</li>

					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
