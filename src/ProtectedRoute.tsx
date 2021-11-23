import { Redirect, Route, RouteProps } from "react-router";
import { SECRET_ANSWER } from "./constants/Constants";

export type ProtectedRouteProps = {
  secretAnswer: string | null;
  authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({
  secretAnswer,
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps) {
  if (localStorage.getItem("secretAnswer") === SECRET_ANSWER) {
    return <Route {...routeProps} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: authenticationPath,
          state: {
            from: routeProps.location,
          },
        }}
      />
    );
  }
}
