
import "./App.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import UserProvider from "./context";

import AppLayout from "./layouts/App-layout";
import RequireAuth from "./components/Require-auth";

import RedirectLink from "./pages/Redirect-link";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LinkPage from "./pages/Link";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
