import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Header } from "./components/Header";

function App() {
	return (
		<MantineProvider>
			<Header />
		</MantineProvider>
	);
}

export default App;
