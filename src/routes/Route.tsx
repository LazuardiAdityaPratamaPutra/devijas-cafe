import type { RouteObject } from "react-router";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ListOrder from "../components/pages/ListOrder";
import DetailOrderItem from "../components/pages/DetailOrderItem";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order",
    element: (
      <ProtectedRoute>
        <ListOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order/:id",
    element: (
      <ProtectedRoute>
        <DetailOrderItem />
      </ProtectedRoute>
    ),
  }
];

export default routes;
