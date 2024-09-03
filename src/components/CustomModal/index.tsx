import { Box, Modal, SxProps } from "@mui/material";

const style: SxProps = {
  p: 0,
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--box-bg-color)",
  borderRadius: "1rem",
};
const CustomModal = ({
  children,
  open,
  onClose,
  containerSx = {},
}: // maxWidth = "xs",
// dialogSx = {},
// fullWidth = true,
{
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  containerSx?: SxProps;
}) => {
  const sxBox: SxProps = {
    ...style,
    ...containerSx,
  };

  return (
    <Modal
      // sx={dialogSx}
      // fullWidth={fullWidth}
      // maxWidth={maxWidth}
      open={open}
      onClose={onClose}
    >
      <Box sx={sxBox}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
