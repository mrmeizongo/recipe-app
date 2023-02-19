import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App/App.jsx";
import ErrorBoundary from "../../helper/ErrorBoundary.jsx";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
