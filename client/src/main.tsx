import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: typical React code
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
