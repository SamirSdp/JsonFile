import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
function App() {
	return (
		<div >
			<NavBar />
			<HomePage />
			<footer className="page-footer font-small  pt-4">
				<Footer />
			</footer>
		</div>
	);
}

export default App;
