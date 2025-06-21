import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ROUTES from "./Routes/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter(ROUTES);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </QueryClientProvider>
  );
}

export default App;
