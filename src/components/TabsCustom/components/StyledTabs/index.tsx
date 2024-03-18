import { Tabs, styled } from "@mui/material";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    top: "50%",
    transform: "translateY(-50%)",
    height: "35px",
    zIndex: -1,
    bottom: "auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "90%",
    backgroundColor: "#55b9b2",
    borderRadius: "calc(infinity * 1px)",
  },
});
