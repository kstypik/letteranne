import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { SignUpPage } from "./pages/SignUp";

const router = createBrowserRouter([
	{
		id: "root",
		path: "/",
		Component: Layout,
	},
	{
		id: "auth",
		path: "/signup",
		Component: SignUpPage,
	},
]);

function Layout() {
	return (
		<>
			<Header />
		</>
	);
}

function App() {
	return (
		<MantineProvider>
			<RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
		</MantineProvider>
	);
}

export default App;
