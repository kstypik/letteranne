import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { SignUpPage } from "./pages/SignUp";
import { store } from "./store";

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
    <Provider store={store}>
      <MantineProvider>
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </MantineProvider>
    </Provider>
  );
}

export default App;
