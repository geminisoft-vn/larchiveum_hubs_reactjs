import React, { useState, useEffect } from "react";

import { Controller, useForm } from "react-hook-form";

import { useParams } from "react-router-dom";

import { Stack, TextField, Typography, Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { Link } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";
import { DocumentService, MediaService } from "src/services";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const DocumentFormPage = () => {
  const { t } = useTranslation();
  const { id: documentId } = useParams();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

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

    input.addEventListener("change", (e) => {
      const { files } = e.target;
      if (files) {
        MediaService.upload({ files: files[0] }).then((media) => {
          callback(import.meta.env.VITE_API_ROOT + media[0].url, {
            title: media[0].name,
          });
        });
      }
    });

    input.click();
  };

  const handleSaveDocument = handleSubmit((data) => {
    const dataToSave = {
      title: data.title,
      desc: data.desc,
      content: editorData,
    };

    if (documentId) {
      // edit
      DocumentService.update(documentId, dataToSave);
    } else {
      // create
      DocumentService.create(dataToSave);
    }
  });

  useEffect(() => {
    loadDefaultValues();
  }, [documentId]);

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
        onEditorChange={(newValue) => {
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
            "autoresize",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | image media file | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | code table help",
        }}
      />
    </Stack>
  );
};

export default DocumentFormPage;
