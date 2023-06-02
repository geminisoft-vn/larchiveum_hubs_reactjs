import { Stack, Grid, Box, Typography } from "@mui/material";



import DocumentCard from "./DocumentCard";
import { useData, useEventBus } from "src/hooks";
import { DocumentService } from "src/services";
import Loader from "src/components/loader/Loader";
import Empty from "src/components/empty";

const Documents = () => {
  const { $emit } = useEventBus();

  const { data: documents, isLoading, mutate } = useData("/documents");

  const handleDeleteDocument = (documentId) => {
    $emit("alert/open", {
      title: "Delete document",
      content: "Do you want to delete this document?",
      okText: "Delete",
      okCallback: () => {
        DocumentService.delete(documentId).finally(() => {
          mutate("/documents");
        });
      },
    });
  };
  return (
    <Stack>
      <Grid container spacing={1}>
        {!isLoading &&
          documents &&
          documents.length > 0 &&
          documents.map((document) => {
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
