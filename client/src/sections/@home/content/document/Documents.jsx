import { useState } from "react";
import { Grid, Pagination, Stack } from "@mui/material";
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
    pageSize: 4,
    filters: [
      {
        key: "userId",
        operator: "=",
        value: user?.id
      }
    ]
  });

  const { data: documents, pagination, isLoading, mutate } = useData(
    user && user.id
      ? `/documents?page=${params.page}&pageSize=${
          params.pageSize
        }&sort=createdAt|desc&filters=${JSON.stringify(params.filters)}`
      : null
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
    <Stack direction="column" alignItems="center" spacing={2}>
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
      </Grid>
      {!isLoading && documents && documents.length === 0 && <Empty />}
      {isLoading && <Loader />}

      {!isLoading &&
        documents &&
        documents.length > 0 && (
          <Pagination
            color="primary"
            count={pagination?.total || 1}
            page={params.page}
            onChange={(_, newPage) =>
              setParams(prev => ({ ...prev, page: newPage }))
            }
          />
        )}
    </Stack>
  );
};

export default Documents;
