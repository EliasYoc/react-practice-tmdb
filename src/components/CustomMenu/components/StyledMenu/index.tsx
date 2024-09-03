import { Menu, MenuProps, styled } from "@mui/material";

export const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)({
  "& .MuiMenu-paper": {
    borderRadius: "1rem",
    backgroundColor: "var(--box-bg-color)",
    color: "var(--text-color)",
  },
  "& .MuiListItemIcon-root": {
    color: "var(--text-color)",
  },
}) as typeof Menu;
