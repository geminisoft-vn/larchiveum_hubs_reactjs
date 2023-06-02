import {
  Grid,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
            <Tooltip title={t('BUTTON.preview')}>
              <IconButton color="info">
                <VisibilityRoundedIcon />
              </IconButton>
            </Tooltip>

            <Link to={`/home/document-form/${document.id}`}>
              <Tooltip title={t('BUTTON.edit')}>
                <IconButton color="warning">
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
            </Link>

            <Tooltip title={t('BUTTON.delete')}>
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
