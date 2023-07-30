import Auth from "../components/Auth/Auth";
import CreateNote from "../pages/CreateNote/CreateNote";
import NotePageId from "../pages/NotePageId/NotePageId";
import Notes from "../pages/Notes/Notes";
export const privateRoutes = [
  {
    path: `/`,
    element: <Notes />,
  },
  {
    path: `/notes/:id`,
    element: <NotePageId />,
  },
  {
    path: `/notes/create`,
    element: <CreateNote />,
  },
];

export const publicRoutes = [{ path: `/auth`, element: <Auth /> }];
