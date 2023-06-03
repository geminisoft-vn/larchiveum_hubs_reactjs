import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, Typography } from "@mui/material";
import { parseInt, transform } from "lodash";
import moment from "moment";
import * as yup from "yup";

import { useAuth, useData } from "src/hooks";
import { RoomForm } from "src/sections/@home/room";
import { RoomService } from "src/services";

const RoomFormPage = () => {
  const { t } = useTranslation();
  const { id: roomId } = useParams();

  const { data: scenes, isLoading: isLoadingScenes } = useData("/scenes");

  const { user } = useAuth();

  const [selectedScene, setSelectedScene] = useState();

  useEffect(
    () => {
      if (scenes && scenes.length > 0) {
        setSelectedScene(scenes[0]);
      }
    },
    [scenes]
  );

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(4, t(`ERROR.invalid_room_name_length`))
      .max(255, t(`ERROR.invalid_room_name_length`))
      .required(t(`ERROR.required`)),
    description: yup
      .string()
      .min(1, t(`ERROR.invalid_room_desc_length`))
      .max(1000, t(`ERROR.invalid_room_desc_length`))
      .required(t(`ERROR.required`)),
    maxSize: yup
      .number()
      .transform(v => parseInt(v, 10))
      .min(1, t(`ERROR.invalid_room_max_size`))
      .max(24, t(`ERROR.invalid_room_max_size`)),
    startDate: yup
      .object()
      .nullable()
      .when("endDate", ([endDate], schema) => {
        return endDate
          ? schema.required(t(`ERROR.invalid_start_date`))
          : schema;
      }),
    endDate: yup
      .object()
      .nullable()
      .test(
        "is-valid-end-date",
        t(`ERROR.invalid_end_date`),
        (endDate, context) => {
          if (endDate) {
            const { startDate } = context.parent;
            if (startDate) {
              return moment(endDate).isAfter(startDate);
            }
            return true;
          }
          return true;
        }
      )
  });

  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startDate: null,
      endDate: null,
      maxSize: 0,
      public: false,
      enablePinObjects: false,
      enableFly: false,
      enableSpawnCamera: false,
      enableSpawnDrawing: false,
      enableSpawnEmoji: false
    },
    resolver: yupResolver(schema)
  });

  const loadDefaultValues = async () => {
    if (roomId) {
      const room = await RoomService.getOne(roomId);
      let defaultValues = {};
      defaultValues.name = room.name;
      defaultValues.description = room.description;
      defaultValues.startDate = room.startDate && moment(room.startDate);
      defaultValues.endDate = room.endDate && moment(room.endDate);
      defaultValues.maxSize = room.maxSize;
      defaultValues.public = room.public;
      defaultValues.enableFly = room.enableFly;
      defaultValues.enablePinObjects = room.enablePinObjects;
      defaultValues.enableSpawnAndMoveMedia = room.enableSpawnAndMoveMedia;
      defaultValues.enableSpawnCamera = room.enableSpawnCamera;
      defaultValues.enableSpawnDrawing = room.enableSpawnDrawing;
      defaultValues.enableSpawnEmoji = room.enableSpawnEmoji;
      if (scenes && scenes.length > 0) {
        let scene = scenes.find(scene => scene.hubSceneId === room.hubSceneId);
        setSelectedScene(scene);
      }

      reset({ ...defaultValues });
    }
  };

  const onSubmit = handleSubmit(data => {
    let dataToSave = transform(
      data,
      (result, value, key) => {
        if (key === "startDate" || key === "endDate") {
          result[key] = moment(result[key]).toISOString();
        }
        return;
      },
      data
    );
    if (roomId) {
      RoomService.update(roomId, {
        ...dataToSave,
        sceneId: selectedScene.hubSceneId,
        hubSceneThumbnailUrl: selectedScene.thumbnailUrl
      });
    } else {
      RoomService.create({
        ...dataToSave,
        sceneId: selectedScene.hubSceneId,
        hubSceneThumbnailUrl: selectedScene.thumbnailUrl,
        userId: user.id
      });
    }
  });

  useEffect(
    () => {
      loadDefaultValues();
    },
    [roomId]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link to="/home/room">
          <Button variant="contained" startIcon={<ArrowBackRoundedIcon />}>
            {t("BUTTON.back")}
          </Button>
        </Link>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {roomId ? "Edit" : "Create"} Room
        </Typography>

        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          endIcon={<SaveRoundedIcon />}
          onClick={onSubmit}
        >
          {t("BUTTON.save")}
        </LoadingButton>
      </Stack>

      <RoomForm
        control={control}
        scenes={scenes}
        isLoadingScenes={isLoadingScenes}
        selectedScene={selectedScene}
        setSelectedScene={setSelectedScene}
        errors={errors}
      />
    </Stack>
  );
};

export default RoomFormPage;
