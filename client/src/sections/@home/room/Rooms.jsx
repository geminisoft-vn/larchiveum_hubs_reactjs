import { useState } from "react";
import { Grid, Pagination, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import qs from "qs";

import Empty from "src/components/empty";
import Loader from "src/components/loader/Loader";
import { useAuth, useData, useEventBus } from "src/hooks";
import { RoomService } from "src/services";

import RoomCard from "./RoomCard";

// ----------------------------------------------------------------------

const Rooms = ({ ...other }) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 999,
    filters: {
      user: {
        id: user?.id
      }
    }
  });

  const { data: rooms, pagination, isLoading, mutate } = useData(
    `/rooms?page=${params.page}&pageSize=${
      params.pageSize
    }&sort=createdAt|desc&filters=${qs.stringify(params.filters)}`
  );

  const { $emit } = useEventBus();

  const handleOpenRoom = roomId => {
    $emit("alert/open", {
      title: "Open Room",
      content: "Do you want to open this room?",
      okText: "Open",
      okCallback: () => {
        RoomService.open(roomId)
          .then(() => {
            mutate();
          })
          .then(() => {
            enqueueSnackbar("Successfully!", { variant: "success" });
          })
          .catch(() => {
            enqueueSnackbar("Failed!", { variant: "error" });
          });
      }
    });
  };

  const handleCloseRoom = roomId => {
    $emit("alert/open", {
      title: "Close Room",
      content: "Do you want to close this room?",
      okText: "Close",
      okCallback: () => {
        RoomService.close(roomId)
          .then(() => {
            mutate();
          })
          .then(() => {
            enqueueSnackbar("Successfully!", { variant: "success" });
          })
          .catch(() => {
            enqueueSnackbar("Failed!", { variant: "error" });
          });
      }
    });
  };

  const handleTogglePublic = (roomId, isPublic) => {
    $emit("alert/open", {
      title: "Change Public",
      content: "Do you want to change public of this room?",
      okText: "Change",
      okCallback: () => {
        RoomService.togglePublic(roomId)
          .then(() => {
            mutate();
          })
          .then(() => {
            enqueueSnackbar("Successfully!", { variant: "success" });
          })
          .catch(() => {
            enqueueSnackbar("Failed!", { variant: "error" });
          });
      }
    });
  };

  return (
    <Stack>
      {!isLoading &&
        rooms &&
        rooms.length > 0 && (
          <>
            <Grid container spacing={1} {...other}>
              {rooms.map(room => (
                <Grid key={room.id} item xs={12} sm={12} md={6} lg={6}>
                  <RoomCard
                    room={room}
                    handleCloseRoom={handleCloseRoom}
                    handleOpenRoom={handleOpenRoom}
                    handleTogglePublic={handleTogglePublic}
                  />
                </Grid>
              ))}
            </Grid>
            <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
              <Pagination
                color="primary"
                count={pagination?.total || 1}
                page={params.page}
                onChange={(_, newPage) =>
                  setParams(prev => ({ ...prev, page: newPage }))
                }
              />
            </Stack>
          </>
        )}
      {!isLoading && rooms && rooms.length === 0 && <Empty />}
      {isLoading && <Loader />}{" "}
    </Stack>
  );
};

export default Rooms;
