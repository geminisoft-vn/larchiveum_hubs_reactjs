import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import * as yup from "yup";

import { useAuth, useEventBus } from "src/hooks";
import AvatarPickingModal from "src/sections/@home/profile/AvatarPickingModal";
import AvatarPreview from "src/sections/@home/profile/AvatarPreview";
import UserInfo from "src/sections/@home/profile/UserInfo";
import UserService from "src/services/UserService";

const ProfilePage = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup.string().required(t("ERROR.required"))
  });

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      username: ""
    },
    resolver: yupResolver(schema)
  });

  const { user } = useAuth();

  const { $emit } = useEventBus();

  const handleOpenAvatarPickingModal = () => {
    $emit("modal/avatar-picking/open", {
      defaultAvatar: user.avatar
    });
  };

  const handleSaveUserInfo = handleSubmit(data => {
    if (!user?.id) return;
    UserService.update(user?.id, { username: data.username });
  });

  useEffect(
    () => {
      let defaultValues = {};
      if (user) {
        defaultValues.username = user.username;
        reset({ ...defaultValues });
      }
    },
    [user]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AvatarPreview
            avatar={user?.avatar}
            handleOpenAvatarPickingModal={handleOpenAvatarPickingModal}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <UserInfo control={control} handleSaveUserInfo={handleSaveUserInfo} />
        </Grid>
      </Grid>

      <AvatarPickingModal />
    </>
  );
};

export default ProfilePage;
