/* eslint-disable no-nested-ternary */
import { useRoutes } from "react-router-dom";
// layouts=
import DashboardLayout from "../layouts/dashboard";
// config
//
import { Faq, Home, Post, Search } from "./elements";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      ),
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/faq",
          element: <Faq />,
        },
        {
          path: "/post",
          element: <Post />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },

    // Dashboard
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          element: <Home />,
          replace: true,
        },
      ],
    },
  ]);
}
