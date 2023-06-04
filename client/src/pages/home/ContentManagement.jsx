import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Container, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";

import { DocumentManagement } from "src/sections/@home/content/document";
import { QuizManagement } from "src/sections/@home/content/quiz";

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

const ContentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    navigate(`?tab=${newValue}`);
  };

  useEffect(() => {
    if (searchParams.get("tab") !== null) {
      setTabIndex(parseInt(searchParams.get("tab")));
    } else {
      setTabIndex(0);
      navigate(`?tab=0`);
    }
  }, [searchParams.get("tab")]);

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChange} centered>
            <Tab label={t("TAB.quiz")} />
            <Tab label={t("TAB.document")} />
            {/* <Tab label={t('TAB.map')} /> */}
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <QuizManagement />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <DocumentManagement />
        </TabPanel>
        {/* <TabPanel value={tabIndex} index={2}>
            Maps
          </TabPanel> */}
      </Box>
    </Container>
  );
};

export default ContentPage;
