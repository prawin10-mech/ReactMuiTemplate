import { Suspense, lazy } from "react";
// components
import LoadingScreen from "../components/loading-screen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

export const Home = Loadable(lazy(() => import("../pages/Home")));
export const Faq = Loadable(lazy(() => import("../pages/Faq")));
export const Post = Loadable(lazy(() => import("../pages/Post")));
export const Search = Loadable(lazy(() => import("../pages/Search")));
