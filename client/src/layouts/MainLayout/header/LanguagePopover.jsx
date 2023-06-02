import { useMemo, useState } from "react";

// @mui
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, Stack, IconButton, Popover } from "@mui/material";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "ko",
    label: "Korean",
    icon: "/assets/icons/korean-flag.svg",
  },
  {
    value: "en",
    label: "English",
    icon: "/assets/icons/usa-flag.svg",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { i18n } = useTranslation();

  const selectedLocale = useMemo(() => {
    return LANGS.find((lang) => lang.value === i18n.languages[0]);
  }, [i18n.languages[0]]);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleselectlocale = (locale) => {
    i18n.changeLanguage(locale);
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
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
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
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
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
}
