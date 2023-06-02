import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Stack, TextField, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { RoomForm } from "src/sections/@home/room";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { transform } from "lodash";

import moment from "moment";
import { RoomService } from "src/services";
import { useAuth } from "src/hooks";

import { useTranslation } from "react-i18next";

const RoomFormPage = () => {
  const { t } = useTranslation();
  const { id: roomId } = useParams();

  const { user } = useAuth();

  const [selectedScene, setSelectedScene] = useState();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      desc: "",
      startDate: "",
      endDate: "",
      maxSize: 0,
      sceneId: "",
      isPublic: false,
      isEnablePinObject: false,
      isEnableFly: false,
      isEnableCreateCamera: false,
      isEnableCreateDrawing: false,
      isEnableCreateEmoji: false,
    },
  });

  const loadDefaultValues = async () => {
    console.log({ roomId });
    if (roomId) {
      const room = await RoomService.getOne(roomId);
      let defaultValues = {};
      defaultValues.name = room.name;
      defaultValues.description = room.description;
      defaultValues.startDate = moment(room.startDate);
      defaultValues.endDate = moment(room.endDate);
      defaultValues.maxSize = room.maxSize;
      defaultValues.public = room.public;
      defaultValues.enableFly = room.enableFly;
      defaultValues.enablePinObjects = room.enablePinObjects;
      defaultValues.enableSpawnAndMoveMedia = room.enableSpawnAndMoveMedia;
      defaultValues.enableSpawnCamera = room.enableSpawnCamera;
      defaultValues.enableSpawnDrawing = room.enableSpawnDrawing;
      defaultValues.enableSpawnEmoji = room.enableSpawnEmoji;
      setSelectedScene({
        hubSceneId: room.sceneId,
        thumbnailUrl: room.hubSceneThumbnailUrl,
      });
      reset({ ...defaultValues });
    }
  };

  const onSubmit = handleSubmit((data) => {
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
        hubSceneThumbnailUrl: selectedScene.thumbnailUrl,
      });
    } else {
      RoomService.create({
        ...dataToSave,
        sceneId: selectedScene.hubSceneId,
        hubSceneThumbnailUrl: selectedScene.thumbnailUrl,
        userId: user.id,
      });
    }
  });

  useEffect(() => {
    loadDefaultValues();
  }, [roomId]);

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

        <Button
          variant="contained"
          endIcon={<SaveRoundedIcon />}
          onClick={onSubmit}
        >
          {t("BUTTON.save")}
        </Button>
      </Stack>

      <RoomForm
        control={control}
        selectedScene={selectedScene}
        setSelectedScene={setSelectedScene}
      />
    </Stack>
  );
};

export default RoomFormPage;
