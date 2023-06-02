import { MenuItem, Select } from "@mui/material";

// ----------------------------------------------------------------------

export default function RoomSort({ options, sort, handleSort }) {
  return (
    <Select
      value={sort}
      onChange={(e) => handleSort(e.target.value)}
      MenuProps={{ disableScrollLock: true }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
