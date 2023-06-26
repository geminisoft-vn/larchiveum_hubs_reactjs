import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import useSWR from "swr";
import * as yup from "yup";

import { useAuth, useEventBus } from "src/hooks";
import { DocumentService, MediaService } from "src/services";
import request from "src/utils/request";

const DocumentFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { $emit } = useEventBus();
  const { enqueueSnackbar } = useSnackbar();
  const { id: documentId } = useParams();
  const { user } = useAuth();

  const { data: document, mutate } = useSWR(
    documentId ? `/documents/${documentId}` : null,
    url => {
      return request.get(url).then(res => res.data.data);
    }
  );

  const schema = yup.object().shape({
    title: yup.string().required(t(`ERROR.required`))
  });

  const {
    control,
    reset,
    trigger,
    getValues,
    formState: { isSubmitting, errors, dirtyFields }
  } = useForm({
    defaultValues: {
      title: "",
      desc: ""
    },
    resolver: yupResolver(schema)
  });

  const loadDefaultValues = async () => {
    if (document) {
      let defaultValues = {};
      defaultValues.title = document.title;
      defaultValues.desc = document.desc;
      reset({ ...defaultValues });
      setEditorData(document.content);
    }
  };

  const [editorData, setEditorData] = useState("");

  const onPickFile = (callback, value, meta) => {
    const input = window.document.createElement("input");
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

  const handleSaveDocumentTitle = async newTitle => {
    if (!documentId) return;
    if (!newTitle) {
      await trigger("title");
      return;
    }
    if (!dirtyFields["title"]) return;
    DocumentService.update(documentId, { title: newTitle }).then(() => {
      mutate();
    });
  };

  const handleSaveDocumentDesc = newDesc => {
    if (!documentId) return;
    DocumentService.update(documentId, { desc: newDesc }).then(() => {
      mutate();
    });
  };

  const handleSaveDocumentContent = () => {
    if (!documentId) return;
    DocumentService.update(documentId, { content: editorData }).then(() => {
      mutate();
    });
  };

  const handleDeleteDocument = () => {
    if (!documentId) return;
    $emit("alert/open", {
      title: "Delete document",
      content: "Do you want to delete this document?",
      okText: "Delete",
      okCallback: () => {
        DocumentService.delete(documentId)
          .then(() => {
            navigate("/home/content?tab=1");
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

  const handleGoBack = async () => {
    if (!getValues("title")) {
      await trigger("title");
      return;
    }
    navigate("/home/content?tab=1");
  };

  useEffect(
    () => {
      loadDefaultValues();
    },
    [document]
  );

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleGoBack}
        >
          {t("BUTTON.back")}
        </Button>

        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {documentId ? "Edit" : "Create"} Document
        </Typography>

        <Button
          color="error"
          endIcon={<DeleteForeverRoundedIcon />}
          variant="contained"
          onClick={handleDeleteDocument}
        >
          {t("BUTTON.delete")}
        </Button>
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
              onBlur={() => handleSaveDocumentTitle(getValues("title"))}
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
              onBlur={() => handleSaveDocumentDesc(getValues("desc"))}
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
        onBlur={handleSaveDocumentContent}
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
