import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ScreenerContent from './ScreenerContent';
import NewsComponent from './NewsComponent';
import ConversationsList from './ConversationsList';
import MarketComponents from './MarketComponents';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const AppTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Market" />
        <Tab label="Screener" />
        <Tab label="News" />
        <Tab label="Conversation" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <MarketComponents />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ScreenerContent />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NewsComponent/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ConversationsList/>
      </TabPanel>
    </div>
  );
};

export default AppTabs;
