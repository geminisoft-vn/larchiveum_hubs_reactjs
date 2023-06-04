import { useState, useEffect } from "react";

import { Grid, Paper, Stack, Button, TextField, Box } from "@mui/material";

import { useForm } from "react-hook-form";

import AvatarPickingModal from "src/sections/@home/profile/AvatarPickingModal";
import { useAuth, useEventBus } from "src/hooks";
import UserService from "src/services/UserService";
import AvatarPreview from "src/sections/@home/profile/AvatarPreview";
import UserInfo from "src/sections/@home/profile/UserInfo";

const ProfilePage = () => {
  const { control, reset, handleSubmit } = useForm();

  const { user } = useAuth();

  const { $emit } = useEventBus();

  const [avatar, setAvatar] = useState();

  const loadAvatar = () => {
    if (user && user.avatarId) {
      UserService.getAvatar(user.id).then((avatar) => {
        console.log({ avatar });
        setAvatar(avatar);
      });
    }
  };

  const handleOpenAvatarPickingModal = () => {
    $emit("modal/avatar-picking/open", {
      defaultAvatar: avatar,
    });
  };

  const handleSaveUserInfo = handleSubmit((data) => {
    UserService.update(user.id, { username: data.username });
  });

  useEffect(() => {
    loadAvatar();

    let defaultValues = {};
    if (user) {
      defaultValues.username = user.username;
      reset({ ...defaultValues });
    }
  }, [user]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <AvatarPreview
            avatar={avatar}
            handleOpenAvatarPickingModal={handleOpenAvatarPickingModal}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <UserInfo control={control} handleSaveUserInfo={handleSaveUserInfo} />
        </Grid>
      </Grid>

      <AvatarPickingModal defaultAvatar={avatar} setAvatar={setAvatar} />
    </>
  );
};


export default ProfilePage
