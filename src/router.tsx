import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import WithdrawPlatformPage from "@/pages/WithdrawPlatformPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "withdraw-platform", element: <WithdrawPlatformPage /> },
    ],
  },
]);
