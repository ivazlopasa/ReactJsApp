import { Navigate, RouteProps, useLocation } from "react-router";
import { SECRET_ANSWER } from "./constants/Constants";

export type ProtectedRouteProps = {
  component: JSX.Element;
  authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({
  component,
  authenticationPath,
}: ProtectedRouteProps) {
  let location = useLocation();

  if (localStorage.getItem("secretAnswer") === SECRET_ANSWER) {
    return component;
  } else {
    return <Navigate to={authenticationPath} state={{ from: location }} />;
  }
}
