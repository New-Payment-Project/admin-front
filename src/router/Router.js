import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loadable from "../components/Loadable/Loadable";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import CreateCourse from "../pages/CreateCourse/CreateCourse";
import CreateLink from "../pages/CreateLink/CreateLink";
import Banks from "../pages/My-banks/Mybanks"
import NotFound from "../pages/NotFound/NotFound";

const App = Loadable(lazy(() => import("../App")));
const Home = Loadable(lazy(() => import("../pages/Home/Home")));
const MyBanks = Loadable(lazy(() => import("../pages/MyBanks/MyBanks")));
const Transaction = Loadable(lazy(() => import("../pages/Transaction-history/Transaction")));

const RouterConfig = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <PrivateRoute>
                    <App />
                </PrivateRoute>
            ),
            children: [
                {
                    path: "/",
                    element: (
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "/my-banks",
                    element: (
                        <PrivateRoute>
                            <Banks />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "/connect-bank",
                    element: (
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "/create-course",
                    element: (
                        <PrivateRoute>
                            <CreateCourse />
                        </PrivateRoute>
                    ),
                },
                {
                    path: "/create-link",
                    element: (
                        <PrivateRoute>
                            <CreateLink />
                        </PrivateRoute>
                    ),
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default RouterConfig;
