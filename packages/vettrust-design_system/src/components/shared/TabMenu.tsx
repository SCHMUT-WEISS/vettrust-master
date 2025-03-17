/* eslint-disable react/require-default-props,@typescript-eslint/ban-ts-ignore */
import React, { ReactNode, useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ComponentProps } from "../../@types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

interface TabMenuProps {
  labels: string[] | ReactNode[];
  tabs: ReactNode[];
  initialTab?: number;
}

const TabMenu: React.FC<ComponentProps<TabMenuProps>> = ({
  labels,
  tabs,
  className,
  initialTab = 0
}) => {
  const [value, setValue] = React.useState(initialTab);

  const handleChange = (_event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const tabLabelsNodes = useMemo(
    () =>
      // @ts-ignore
      labels.map((label: string | ReactNode, index: number) => (
        <Tab
          key={Math.random().toString()}
          label={label}
          {...a11yProps(index)}
          className="custom-tab"
          sx={{
            padding: 0,
            marginRight: "24px"
          }}
        />
      )),
    [labels]
  );

  const tabContentNodes = useMemo(
    () =>
      tabs.map((tab, index) => (
        <TabPanel value={value} index={index} key={`${Math.random()}`}>
          {tab}
        </TabPanel>
      )),
    [tabs, value]
  );

  return (
    <div className={className}>
      <div className="container-wrapper">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "secondary.main",
              height: 3
            },
            "& .MuiTab-textColorSecondary": {
              color: "primary.main"
            },
            "& .MuiTab-root.Mui-selected": {
              color: `#d52f89`
            },
            borderBottom: "1px solid #D9CEBF",
            zIndex: 12
          }}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto"
        >
          {tabLabelsNodes}
        </Tabs>
      </div>
      {tabContentNodes}
    </div>
  );
};

export default TabMenu;
