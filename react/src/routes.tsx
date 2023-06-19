import { Link, RouteObject, createBrowserRouter } from "react-router-dom";
import Pokemon from "./pages/Pokemon";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <div>Home</div>
        <Link to="/pokemon">Pokemon</Link>
      </>
    ),
  },
  {
    path: "/pokemon",
    element: <Pokemon />,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
];

export const router = createBrowserRouter(routes, {
  basename: "/react",
});
