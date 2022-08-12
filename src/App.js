import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
import NavBar from "./component/NavBar";
function App() {
	return (
		<div className="App-page-stl">
				<NavBar />
				<HomePage />
		
		</div>
	);
}

export default App;
