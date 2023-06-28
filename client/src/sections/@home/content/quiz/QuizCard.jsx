import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography
} from "@mui/material";

const QuizCard = ({ quiz, handleDeleteQuiz }) => {
  const { t } = useTranslation();
  const { title, desc } = quiz;

  return (
    <Grid item lg={3} md={4} sm={6} xs={6}>
      <Paper elevation={4}>
        <Card sx={{ minWidth: 256 }}>
          <CardContent>
            {title ? (
              <Typography variant="h3">{title}</Typography>
            ) : (
              <Typography
                variant="h3"
                sx={{ color: "#999", userSelect: "none !important" }}
              >
                Untitled
              </Typography>
            )}

            <Typography variant="body2">{desc}</Typography>
          </CardContent>
          <CardActions>
            <Link to={`/quiz-game/${quiz.id}`} target="_blank">
              <Tooltip title={t("BUTTON.preview")}>
                <IconButton color="info">
                  <VisibilityRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to={`/home/quiz-form/${quiz.id}`}>
              <Tooltip title={t("BUTTON.edit")} color="warning">
                <IconButton>
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title={t("BUTTON.delete")}>
              <IconButton
                onClick={() => handleDeleteQuiz(quiz.id)}
                color="error"
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  );
};

export default QuizCard;
