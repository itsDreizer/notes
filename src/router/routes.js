import Login from "../pages/Login";
import Register from "../pages/Register";
import Notes from "../pages/Notes";
export const privateRoutes = [
  {
    path: `/`,
    element: <Notes />,
  },
];

export const publicRoutes = [
  { path: `/login`, element: <Login /> },
  { path: `/register`, element: <Register /> },
];
