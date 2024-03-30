import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { StyledMenu } from "./components/StyledMenu";

export interface IMenuOption {
  optionLabel: string;
  optionShortcut?: string;
  optionIcon?: ReactNode;
  onClick: () => void;
}

interface IMenuProps {
  menuOptions: IMenuOption[];
  anchorEl: null | HTMLElement;
  onClose: () => void;
}
const CustomMenu = ({ menuOptions, anchorEl, onClose }: IMenuProps) => {
  const open = Boolean(anchorEl);

  return (
    <StyledMenu
      id="tab-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        onClose();
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      {menuOptions.map((item) => (
        <MenuItem
          onClick={() => {
            onClose();
            item.onClick();
          }}
          style={{ gap: "1rem" }}
        >
          {item.optionIcon && (
            <ListItemIcon style={{ minWidth: "unset" }}>
              {item.optionIcon}
            </ListItemIcon>
          )}
          <ListItemText>{item.optionLabel}</ListItemText>
          {item.optionShortcut && (
            <Typography variant="body2" color="text.secondary">
              {item.optionShortcut}
            </Typography>
          )}
        </MenuItem>
      ))}
    </StyledMenu>
  );
};

export default CustomMenu;
