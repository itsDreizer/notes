import Auth from "../components/Auth/Auth";
import Notes from "../pages/Notes/Notes";
export const privateRoutes = [
  {
    path: `/`,
    element: <Notes />,
  },
];

export const publicRoutes = [{ path: `/auth`, element: <Auth /> }];
