import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { LoadingButton } from "@mui/lab";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import * as yup from "yup";

import { useAuth } from "src/hooks";
import { DocumentService, MediaService } from "src/services";
import { useSnackbar } from "notistack";

const DocumentFormPage = () => {
  const { t } = useTranslation();
  const { id: documentId } = useParams();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const schema = yup.object().shape({
    title: yup.string().required(t(`ERROR.required`))
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      title: "",
      desc: ""
    },
    resolver: yupResolver(schema)
  });

  const loadDefaultValues = async () => {
    if (documentId) {
      const _document = await DocumentService.getOne(documentId);
      let defaultValues = {};
      defaultValues.title = _document.title;
      defaultValues.desc = _document.desc;
      reset({ ...defaultValues });
      setEditorData(_document.content);
    }
  };

  const [editorData, setEditorData] = useState("");

  const onPickFile = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    if (meta.filetype === "image") {
      input.setAttribute("accept", "image/*");
    }
    if (meta.filetype === "media") {
      input.setAttribute("accept", "video/*,audio/*");
    }

    input.addEventListener("change", e => {
      const { files } = e.target;
      if (files) {
        MediaService.upload({ files: files[0] })
          .then(mediaUrl => {
            enqueueSnackbar("Upload Successfully!", { variant: "success" });
            return mediaUrl;
          })
          .then(mediaUrl => {
            callback(mediaUrl, {
              title: files[0].filename
            });
          })
          .catch(() => {
            enqueueSnackbar("Upload Failed!", { variant: "error" });
          });
      }
    });

    input.click();
  };

  const handleSaveDocument = handleSubmit(data => {
    const dataToSave = {
      title: data.title,
      desc: data.desc,
      content: editorData,
      userId: user.id
    };

    if (documentId) {
      // edit
      DocumentService.update(documentId, dataToSave)
        .then(() => {
          enqueueSnackbar("Successfully!", { variant: "success" });
        })
        .catch(() => {
          enqueueSnackbar("Failed!", { variant: "error" });
        });
    } else {
      // create
      DocumentService.create(dataToSave)
        .then(() => {
          enqueueSnackbar("Successfully!", { variant: "success" });
        })
        .catch(() => {
          enqueueSnackbar("Failed!", { variant: "error" });
        });
    }
  });

  useEffect(
    () => {
      loadDefaultValues();
    },
    [documentId]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link to="/home/content?tab=1">
          <Button variant="contained" startIcon={<ArrowBackRoundedIcon />}>
            {t("BUTTON.back")}
          </Button>
        </Link>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {documentId ? "Edit" : "Create"} Document
        </Typography>

        <LoadingButton
          loading={isSubmitting}
          endIcon={<SaveRoundedIcon />}
          variant="contained"
          onClick={handleSaveDocument}
        >
          {t("BUTTON.save")}
        </LoadingButton>
      </Stack>

      <Controller
        name="title"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              error={Boolean(errors.title)}
              helperText={errors.title && errors.title.message}
              InputLabelProps={{ shrink: true }}
              label="Title"
              {...field}
            />
          );
        }}
      />

      <Controller
        name="desc"
        control={control}
        render={({ field }) => {
          return (
            <TextField
              error={Boolean(errors.desc)}
              helperText={errors.desc && errors.desc.message}
              label="Description"
              InputLabelProps={{ shrink: true }}
              {...field}
            />
          );
        }}
      />

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={editorData}
        onEditorChange={newValue => {
          setEditorData(newValue);
        }}
        init={{
          forced_root_block: "",
          min_height: 512,
          width: "100%",
          menubar: true,
          file_picker_callback: onPickFile,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "media",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "fullscreen",
            "insertdatetime",
            "table",
            "help",
            "wordcount",
            "autoresize"
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | image media file | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | code table help"
        }}
      />
    </Stack>
  );
};

export default DocumentFormPage;
