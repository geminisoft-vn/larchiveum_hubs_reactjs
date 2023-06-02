import { useState } from "react";

// @mui
import { Grid, Stack, Pagination } from "@mui/material";
// components
import { RoomSearch, RoomCard, RoomSort } from "src/sections/@home/app";
import { useAuth, useData, useEventBus } from "src/hooks";
import Loader from "src/components/loader/Loader";
import Empty from "src/components/empty";
import { ReservationService } from "src/services";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "createdAt|desc", label: "Latest" },
  { value: "createdAt|asc", label: "Oldest" },
];

const AppPage = () => {
  const { user } = useAuth();
  const { $emit } = useEventBus();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 8,
    sort: "createdAt|desc",
  });

  const {
    data: rooms,
    pagination,
    isLoading,
    mutate,
  } = useData(
    `/rooms?page=${params.page}&pageSize=${params.pageSize}&sort=${params.sort}`
  );

  const handleReservate = (roomId) => {
    $emit("alert/open", {
      title: "Make Reservation",
      content: "Do you want to make reservation of this room?",
      okCallback: () => {
        ReservationService.create({
          roomId,
          userId: user.id,
        }).then(() => {
          mutate();
        });
      },
    });
  };

  const handleSort = (value) => {
    setParams((prev) => ({ ...prev, sort: value }));
  };

  return (
    <>
      <Stack
        mb={5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* <RoomSearch rooms={rooms} /> */}
        <RoomSort
          options={SORT_OPTIONS}
          sort={params.sort}
          handleSort={handleSort}
        />
      </Stack>

      {!isLoading && rooms && rooms.length > 0 && (
        <>
          <Grid container spacing={3}>
            {rooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                handleReservate={handleReservate}
              />
            ))}
          </Grid>
          <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
            <Pagination
              color="primary"
              count={pagination?.total || 1}
              page={params.page}
              onChange={(_, newPage) =>
                setParams((prev) => ({ ...prev, page: newPage }))
              }
            />
          </Stack>
        </>
      )}
      {!isLoading && rooms && rooms.length === 0 && <Empty />}
      {isLoading && <Loader />}
    </>
  );
};

export default AppPage;
