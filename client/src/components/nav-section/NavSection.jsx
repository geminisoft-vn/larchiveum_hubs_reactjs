import { Link } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

import { useAuth } from "src/hooks";

//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array
};

export default function NavSection({ data = [], ...other }) {
  const { user, syncAdminAccounts } = useAuth();

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        <NavItem
          item={{
            title: "Home",
            path: "/home/app"
          }}
        />
        {data.map(
          item =>
            user &&
            user.type >= item.requiredType && (
              <NavItem key={item.title} item={item} />
            )
        )}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={Link}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold"
        }
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
