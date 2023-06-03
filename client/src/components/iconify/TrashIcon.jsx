import { red } from "@mui/material/colors";

import Iconify from "./Iconify";

const TrashIcon = () => {
  return (
    <Iconify
      icon={"eva:trash-2-outline"}
      sx={{
        color: red[500]
      }}
    />
  );
};

export default TrashIcon;
