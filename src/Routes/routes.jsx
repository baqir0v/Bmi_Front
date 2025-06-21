import ScrollToTop from "../components/ScrollToTop.jsx";
import Calculator from "../pages/calculator/index.jsx";
import Home from "../pages/home/index.jsx";
import UserList from "../pages/list/index.jsx";
import SiteRoot from "../pages/SiteRoot";

const ROUTES = [
  {
    path: "/",
    element: (
      <ScrollToTop>
        <SiteRoot />
      </ScrollToTop>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/calculator",
        element: <Calculator />,
      },
      {
        path: "/list",
        element: <UserList />,
      },
    ],
  },
  {
    path: "*",
    element: <SiteRoot />,
    children: [
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

export default ROUTES;
