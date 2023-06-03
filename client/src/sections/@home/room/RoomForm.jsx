import { Controller } from "react-hook-form";
import {
  Autocomplete,
  Box,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const RoomForm = ({
  control,
  scenes,
  isLoadingScenes,
  selectedScene,
  setSelectedScene,
  errors
}) => {
  return (
    <Grid container spacing={2} justifyContent="space-between">
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Controller
          name={"name"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={Boolean(errors.name)}
              helperText={errors.name && errors.name.message}
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              value={value}
              label={"Name"}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Controller
          name="startDate"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <DatePicker
              slotProps={{
                textField: {
                  error: Boolean(errors.startDate),
                  helperText: errors.startDate && errors.startDate.message
                }
              }}
              label="Start Date"
              {...rest}
            />
          )}
        />{" "}
      </Grid>{" "}
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Controller
          name="endDate"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <DatePicker
              slotProps={{
                textField: {
                  error: Boolean(errors.endDate),
                  helperText: errors.endDate && errors.endDate.message
                }
              }}
              label="End Date"
              {...rest}
            />
          )}
        />{" "}
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Controller
          name={"maxSize"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={Boolean(errors.maxSize)}
              helperText={errors.maxSize && errors.maxSize.message}
              onChange={onChange}
              value={value}
              label={"Max Size"}
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          )}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Stack direction="column">
          <Controller
            name={"description"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                error={Boolean(errors.description)}
                helperText={errors.description && errors.description.message}
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={onChange}
                value={value}
                label={"Description"}
                multiline
                rows={4}
                maxRows={8}
              />
            )}
          />
          <Grid container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="public"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Switch
                          onChange={e => field.onChange(e.target.checked)}
                          checked={field.value}
                        />
                      );
                    }}
                  />
                }
                label="Public"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="enableSpawnCamera"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        onChange={e => field.onChange(e.target.checked)}
                        checked={field.value}
                      />
                    )}
                  />
                }
                label="Create Cameras"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="enablePinObjects"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        onChange={e => field.onChange(e.target.checked)}
                        checked={field.value}
                      />
                    )}
                  />
                }
                label="Pin Objects"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="enableSpawnDrawing"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        onChange={e => field.onChange(e.target.checked)}
                        checked={field.value}
                      />
                    )}
                  />
                }
                label="Create Drawings"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="enableSpawnEmoji"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        onChange={e => field.onChange(e.target.checked)}
                        checked={field.value}
                      />
                    )}
                  />
                }
                label="Create Emoji"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    name="enableFly"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        onChange={e => field.onChange(e.target.checked)}
                        checked={field.value}
                      />
                    )}
                  />
                }
                label="Allow Flying"
              />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Stack direction="column" spacing={2}>
          {selectedScene && (
            <Autocomplete
              freeSolo
              loading={isLoadingScenes}
              options={scenes}
              getOptionLabel={option => option.name}
              autoHighlight
              value={selectedScene}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                );
              }}
              onChange={(e, newValue) => {
                if (newValue) {
                  setSelectedScene(newValue);
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Scene"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "disabled" // disable autocomplete and autofill
                  }}
                />
              )}
            />
          )}
          <Box
            sx={{
              width: "100%",
              height: {
                xl: 512,
                lg: 400,
                md: 300,
                sm: 256,
                xs: 128
              },
              position: "relative"
            }}
          >
            <img
              src={
                selectedScene?.thumbnailUrl ||
                "/assets/images/default-image.png"
              }
              alt=""
              style={{
                borderRadius: "16px",
                objectFit: "cover"
              }}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RoomForm;
