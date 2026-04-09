import { Route } from "react-router";
import RoutesWithNotFound from "./components/RoutesWithNotFound";
import { HomePage } from "@/pages/HomePage";

export const PublicRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route index element={<HomePage />} />
      <Route path="login" element={<p>Login</p>} />
    </RoutesWithNotFound>
  );
};
