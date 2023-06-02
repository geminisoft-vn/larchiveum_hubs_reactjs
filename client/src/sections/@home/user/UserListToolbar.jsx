import {
  IconButton,
  Button,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
// @mui
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// component
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

const UserListToolbar = ({ numSelected, filterName, onFilterName }) => {
  const { t } = useTranslation();

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {t(`BUTTON.add`)}
        </Button>

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
    </StyledRoot>
  );
};

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default UserListToolbar;
