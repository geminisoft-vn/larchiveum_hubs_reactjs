import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import { useSnackbar } from "notistack";

import Empty from "src/components/empty";
import Loader from "src/components/loader/Loader";
import { useAuth, useData, useEventBus } from "src/hooks";
import { DocumentService } from "src/services";

import DocumentCard from "./DocumentCard";

const Documents = () => {
  const { $emit } = useEventBus();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [params, setParams] = useState({
    page: 1,
    pageSize: 999,
    filters: [
      {
        key: "userId",
        operator: "=",
        value: user.id
      }
    ]
  });

  const { data: documents, isLoading, mutate } = useData(
    `/documents?page=${params.page}&pageSize=${
      params.pageSize
    }&sort=createdAt|desc&filters=${JSON.stringify(params.filters)}`
  );

  const handleDeleteDocument = documentId => {
    $emit("alert/open", {
      title: "Delete document",
      content: "Do you want to delete this document?",
      okText: "Delete",
      okCallback: () => {
        DocumentService.delete(documentId)
          .then(() => {
            mutate("/documents");
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

  return (
    <Stack>
      <Grid container spacing={1}>
        {!isLoading &&
          documents &&
          documents.length > 0 &&
          documents.map(document => {
            return (
              <DocumentCard
                key={document.id}
                document={document}
                handleDeleteDocument={handleDeleteDocument}
              />
            );
          })}
        {!isLoading && documents && documents.length === 0 && <Empty />}
        {isLoading && <Loader />}
      </Grid>
    </Stack>
  );
};

export default Documents;
