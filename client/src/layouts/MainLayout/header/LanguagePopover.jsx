import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, MenuItem, Popover, Stack } from "@mui/material";
// @mui
import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "ko",
    label: "Korean",
    icon: "/assets/icons/korean-flag.svg"
  },
  {
    value: "en",
    label: "English",
    icon: "/assets/icons/usa-flag.svg"
  }
];

// ----------------------------------------------------------------------

const LanguagePopover = () => {
  const { i18n } = useTranslation();

  const selectedLocale = useMemo(
    () => {
      const locale = localStorage.getItem("__LARCHIVEUM__LOCALE");
      if (locale) {
        return LANGS.find(lang => lang.value === locale);
      }
      return LANGS.find(lang => lang.value === i18n.languages[0]);
    },
    [i18n.languages]
  );

  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleselectlocale = locale => {
    i18n.changeLanguage(locale);
    localStorage.setItem("__LARCHIVEUM__LOCALE", locale);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 48,
          height: 48,
          ...(open && {
            bgcolor: theme =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              )
          })
        }}
      >
        <img
          src={selectedLocale.icon}
          alt={selectedLocale.label}
          width={24}
          height={24}
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableScrollLock
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75
            }
          }
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map(option => (
            <MenuItem
              key={option.value}
              selected={option.value === i18n.languages[0]}
              onClick={() => handleselectlocale(option.value)}
            >
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default LanguagePopover;
