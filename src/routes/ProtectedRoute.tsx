import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router";

interface PropTypes {
  children: ReactNode;
}

const ProtectedRoute = (props: PropTypes) => {
  const { children } = props;
  const auth = localStorage.getItem("auth");
  const currentRoute = useLocation().pathname;

  if (!auth && currentRoute !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  if (auth && currentRoute === "/auth") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
