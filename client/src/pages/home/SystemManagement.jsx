import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Container, Tab, Tabs, Button } from "@mui/material";
import PropTypes from "prop-types";

import UserPage from "./system/UserManagement";
import QuizManagement from "./system/QuizManagement";
import { useAuth } from "src/hooks";
import UserManagamentPage from "./system/UserManagement";
import DocumentManagement from "./system/DocumentManagement";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children} </Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SystemPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    navigate(`?tab=${newValue}`);
  };

  useEffect(
    () => {
      if (searchParams.get("tab") !== null) {
        setTabIndex(parseInt(searchParams.get("tab")));
      } else {
        setTabIndex(0);
        navigate(`?tab=0`);
      }
    },
    [searchParams.get("tab")]
  );

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange} centered>
            <Tab label={t("TAB.info")} />
            <Tab label={t("TAB.user")} />
            <Tab label={t("TAB.quiz")} sx={{ ml: 2, mr: 2 }} />
            <Tab label={t("TAB.document")} sx={{ ml: 2, mr: 2 }} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0} />
        <TabPanel value={tabIndex} index={1}>
          <UserManagamentPage />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <QuizManagement />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <DocumentManagement/>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default SystemPage;
