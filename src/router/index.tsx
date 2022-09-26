import React from "react";
import {
  createBrowserRouter
} from "react-router-dom";

const Home = React.lazy(() => import('../pages/home'));
const PredictSystem = React.lazy(() => import('../pages/predictSystem'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/predict",
    element: <PredictSystem/>
  }
]);

export default router;