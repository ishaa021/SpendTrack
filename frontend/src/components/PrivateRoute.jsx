import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {    // here children means dashboard
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;