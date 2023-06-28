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

const QuizCard = ({ document, handleDeleteDocument }) => {
  const { t } = useTranslation();
  const { title, desc } = document;

  return (
    <Grid item lg={3} md={4} sm={6} xs={6}>
      <Paper elevation={4}>
        <Card sx={{ minWidth: 256 }}>
          <CardContent>
            <Typography variant="h3">{title}</Typography>

            <Typography variant="body2">{desc}</Typography>
          </CardContent>
          <CardActions>
            <Link to={`/document-viewer/${document.id}`} target="_blank">
              <Tooltip title={t("BUTTON.preview")}>
                <IconButton color="info">
                  <VisibilityRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Link to={`/home/document-form/${document.id}`}>
              <Tooltip title={t("BUTTON.edit")}>
                <IconButton color="warning">
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title={t("BUTTON.delete")}>
              <IconButton
                onClick={() => handleDeleteDocument(document.id)}
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
