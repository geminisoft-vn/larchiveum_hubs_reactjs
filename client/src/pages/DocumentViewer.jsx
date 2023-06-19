import { useEffect, useState } from "react";

import { Container } from "@mui/material";

import DocumentService from "../services/DocumentService.js";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Document = () => {
  const { id: documentId } = useParams();
  const [document, setDocument] = useState();

  const loadDocument = () => {
    DocumentService.getOne(documentId).then((document) => {
      if (document) {
        setDocument(document);
      }
    });
  };

  useEffect(() => {
    loadDocument();
  }, [documentId]);

  return (
    <>
      <Helmet>
        <title>{document?.title}</title>
      </Helmet>
      <Container sx={{ height: "100%" }}>
        <div dangerouslySetInnerHTML={{ __html: document?.content }} />
      </Container>
    </>
  );
};

export default Document;
