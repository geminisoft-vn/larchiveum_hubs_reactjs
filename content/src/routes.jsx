import { useRoutes } from "react-router-dom";

import { QuizPage, DocumentPage } from "./pages";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/quiz/:id",
      element: <QuizPage />,
    },

    {
      path: "/document/:id",
      element: <DocumentPage />,
    },
  ]);

  return routes;
}
