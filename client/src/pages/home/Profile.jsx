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

  const [avatar, setAvatar] = useState();

  const loadAvatar = () => {
    if (user && user.hubAvatarId) {
      UserService.getAvatar(user.id).then(avatar => {
        setAvatar(avatar);
      });
    }
  };

  const handleOpenAvatarPickingModal = () => {
    $emit("modal/avatar-picking/open", {
      defaultAvatar: avatar
    });
  };

  const handleSaveUserInfo = handleSubmit(data => {
    UserService.update(user.id, { username: data.username });
  });

  useEffect(() => {
    loadAvatar();
  }, []);

  useEffect(() => {
    let defaultValues = {};
    if (user.id) {
      defaultValues.username = user.username;
      reset({ ...defaultValues });
    }
  }, []);

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

      <AvatarPickingModal
        defaultAvatar={avatar}
        setAvatar={setAvatar}
        loadAvatar={loadAvatar}
      />
    </>
  );
};

export default ProfilePage;
