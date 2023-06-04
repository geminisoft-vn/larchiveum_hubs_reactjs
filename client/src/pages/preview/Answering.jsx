import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from "@mui/material";

const Answering = () => {
  const { id: quizId, questionId } = useParams();

  console.log({ quizId, questionId });

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Paper elevation={4}>
      <Stack direction="row">
        <Stack direction="column">
          <Typography>Qusetion #1</Typography>
          <Typography>COntent</Typography>
        </Stack>

        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
      </Stack>
    </Paper>
  );
};

export default Answering;
