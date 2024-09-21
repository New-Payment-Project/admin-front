import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loadable from "../components/Loadable/Loadable";
import Transaction from "../pages/Transaction-history/Transaction";
import Login from "../pages/Login";

const App = Loadable(lazy(() => import("../App")));
const Home = Loadable(lazy(() => import("../pages/Home/Home")));

const RouterConfig = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/home",
                    element: <Home />,
                },
                {
                    path: "/banks",
                    element: <Home />,
                },
                {
                    path: "/transaction-history",
                    element: <Transaction />,
                },
                {
                    path: "/transfers",
                    element: <Home />,
                },
                {
                    path: "/connect-bank",
                    element: <Home />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default RouterConfig;
