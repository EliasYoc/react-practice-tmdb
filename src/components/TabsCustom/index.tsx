import { SyntheticEvent, useState } from "react";
import { StyledTabs } from "./components/StyledTabs";
import { StyledTab } from "./components/StyledTab";
import { TabProps } from "@mui/material";
import CustomMenu, { IMenuOption } from "../CustomMenu";

interface IPanel {
  children?: JSX.Element;
  index: number;
  value: number;
  style?: React.CSSProperties;
}
const TabPanel = ({ children, value, index, style }: IPanel) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      style={{ flexGrow: 1, ...style }}
    >
      {value === index && children}
    </div>
  );
};

interface ITab extends TabProps {
  tabPanel: JSX.Element;
  label: string;
  menuOptions?: IMenuOption[];
  // disable?: boolean;
  // disableFocusRipple?: boolean;
  // icon?: string;
  // iconPosition?: "bottom" | "end" | "start" | "top";
  // wrapped?: boolean;
}

interface ITabsProps {
  tabList: (ITab | null)[];
  // idKey?: string;
  onChange?: (event: SyntheticEvent<Element, Event>) => void;
  tabPanelStyle?: React.CSSProperties;
}

const TabsCustom = ({ tabList, onChange, tabPanelStyle }: ITabsProps) => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOptions, setMenuOptions] = useState<IMenuOption[]>([]);
  const open = Boolean(anchorEl);
  const openTabMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeTabMenu = () => {
    setAnchorEl(null);
  };

  const filteredTabList = tabList.filter((item) => item !== null);
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
    onChange?.(event);
  };

  return (
    <>
      <StyledTabs variant="scrollable" value={value} onChange={handleChange}>
        {filteredTabList.map((tab, index: number) => {
          const menuOptions = tab?.menuOptions || [];
          const tabProps = {
            ...tab,
          };
          if (menuOptions) {
            delete tabProps.menuOptions;
          }
          delete tabProps.tabPanel;
          return (
            <StyledTab
              {...tabProps}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              key={index}
              onContextMenu={(e) => {
                e.preventDefault();

                e.currentTarget.click();
                setMenuOptions(menuOptions);
                openTabMenu(e);
              }}
            />
          );
        })}
        {menuOptions?.length > 0 && (
          <CustomMenu
            anchorEl={anchorEl}
            onClose={closeTabMenu}
            menuOptions={menuOptions}
          />
        )}
      </StyledTabs>
      {filteredTabList.map((tab, index: number) => {
        return (
          <TabPanel
            style={tabPanelStyle}
            key={index}
            value={value}
            index={index}
          >
            {tab?.tabPanel}
          </TabPanel>
        );
      })}
    </>
  );
};

export default TabsCustom;
