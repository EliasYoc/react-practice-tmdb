import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface IPanel {
  children?: JSX.Element;
  index: number;
  value: number;
}
const TabPanel = ({ children, value, index }: IPanel) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </div>
  );
};
interface ITab {
  tabPanel?: JSX.Element;
  label: string;
  disable?: boolean;
  disableFocusRipple?: boolean;
  icon?: string;
  iconPosition?: "bottom" | "end" | "start" | "top";
  wrapped?: boolean;
}

interface ITabsProps {
  tabList: (ITab | null)[];
  idKey?: string;
  onChange?: () => void;
}

const TabsCustom = ({ tabList, idKey, onChange }: ITabsProps) => {
  const [value, setValue] = useState(0);


  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
    onChange?.();
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {tabList.map((tab, index: number) => {
          const tabProps = {
            ...tab,
          };
          delete tabProps.tabPanel;
          return (
            <Tab
              {...tabProps}
              key={index}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          );
        })}
      </Tabs>
      {tabList.map((tab, index: number) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            {tab?.tabPanel}
          </TabPanel>
        );
      })}
    </>
  );
};

export default TabsCustom;
