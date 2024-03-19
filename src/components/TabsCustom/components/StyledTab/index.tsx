import { Tab, styled } from "@mui/material";

interface StyledTabProps {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    transition: theme.transitions.create("color", {
      duration: theme.transitions.duration.shortest,
    }),
    color: "var(--secondary-text-color)",
    position: "relative",
    zIndex: 1,
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
) as typeof Tab;
