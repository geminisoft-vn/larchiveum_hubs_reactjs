import { Autocomplete, InputAdornment, Popper, TextField } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

// components
import Iconify from "src/components/iconify";

import RoomSort from "./RoomSort";

// ----------------------------------------------------------------------

const StyledPopper = styled(props => (
  <Popper placement="bottom-start" {...props} />
))({
  width: "280px !important"
});

// ----------------------------------------------------------------------

const RoomSearch = ({ rooms }) => {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      PopperComponent={StyledPopper}
      options={rooms}
      getOptionLabel={room => room.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Search room..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"eva:search-fill"}
                  sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }}
                />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};

RoomSearch.propTypes = {
  rooms: PropTypes.array.isRequired
};

export default RoomSearch;
