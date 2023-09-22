import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import * as yup from "yup";

import { useAuth, useEventBus } from "src/hooks";
import AvatarPickingModal from "src/sections/@home/profile/AvatarPickingModal";
import AvatarPreview from "src/sections/@home/profile/AvatarPreview";
import UserInfo from "src/sections/@home/profile/UserInfo";
import UserService from "src/services/UserService";
import moment from "moment";
import { USER_TYPE } from "src/utils/constant";
import ChangePasswordModal from "src/sections/@home/profile/ChangePasswordModal";

const ProfilePage = () => {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t(`ERROR.invalid_username_length`))
      .max(32, t(`ERROR.invalid_username_length`))
      .required(t("ERROR.invalid_required")),
  });

  const methods = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(schema),
  });

  const { user, mutate } = useAuth();

  const { $emit } = useEventBus();

  const handleOpenAvatarPickingModal = () => {
    $emit("modal/avatar-picking/open", {
      defaultAvatar: user.avatar,
    });
  };

  const handleOpenChangePasswordModal = () => {
    $emit("modal/change-password/open", {
    });
  };

  const handleSaveUserInfo = methods.handleSubmit((data) => {
    if (!user?.id) return;
    UserService.update(user?.id, { username: data.username }).then(() => {
      mutate();
    });
  });

  useEffect(
    () => {
      let defaultValues = {};
      if (user) {
        defaultValues.username = user.username;
        methods.reset({ ...defaultValues });
      }
    },
    [user]
  );

  return (
    <>
      <FormProvider {...methods}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Chip label="Avatar" variant="outlined" />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <AvatarPreview
              avatar={user?.avatar}
              handleOpenAvatarPickingModal={handleOpenAvatarPickingModal}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <UserInfo
                  control={methods.control}
                  handleSaveUserInfo={handleSaveUserInfo}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Chip label="User Info" variant="outlined" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Paper elevation={4} sx={{ p: 2 }}>
                  <List>
                  <ListItem>
                      <ListItemText
                        primary={`Email: ${user.email}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Join Date: ${moment(user.createdAt).format(
                          "YYYY/MM/DD"
                        )}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Authority: ${USER_TYPE[user.type]}`}
                      />
                    </ListItem>
                  </List>
                  <Grid container justifyContent="space-between">
                    <Button variant="contained" userEmail= {user.email} onClick={handleOpenChangePasswordModal}>
                      {t("BUTTON.changepass")}
                    </Button>
                    <Button variant="contained">
                      {t("BUTTON.withdraw")}
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>

      <AvatarPickingModal />
      <ChangePasswordModal />
    </>
  );
};

export default ProfilePage;
