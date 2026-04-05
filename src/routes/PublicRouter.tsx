import { Navigate, Route } from "react-router";
import RoutesWithNotFound from "./components/RoutesWithNotFound";
import { HomePage } from "@/pages/HomePage";

export const PublicRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<HomePage />} />
      <Route path="login" element={<p>Login</p>} />
    </RoutesWithNotFound>
  );
};
