import { Navigate, Route } from "react-router";
import RoutesWithNotFound from "./components/RoutesWithNotFound";

export const PublicRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<p>Home</p>} />
      <Route path="login" element={<p>Login</p>} />
    </RoutesWithNotFound>
  );
};
