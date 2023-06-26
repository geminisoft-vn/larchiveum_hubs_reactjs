import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Interceptor = ({ children }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has("quiz-game")) {
      if (searchParams.get("quiz-game")) {
        const quizId = searchParams.get("quiz-game");
        navigate(`/quiz-game/${quizId}`);
      }
    } else if (searchParams.has("document-viewer")) {
      if (searchParams.get("document-viewer")) {
        const documentId = searchParams.get("document-viewer");
        navigate(`/document-viewer/${documentId}`);
      }
    }
  }, []);

  return <>{children}</>;
};

export default Interceptor;
