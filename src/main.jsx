import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import WaterPollution from "./pages/waterPollution/WaterPollution.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cienaga",
    element: <WaterPollution />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
