import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loadable from "../components/Loadable/Loadable";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";  // Import private route

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
                           
                        </PrivateRoute>
                    ),
                },
                {
                    path: "/transaction-history",
                    element: (
                        <PrivateRoute> 
                            <Transaction />
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
