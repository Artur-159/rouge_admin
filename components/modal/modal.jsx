import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "../button/button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isModalOpen } from "../../store/modal/slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 4,
  p: 4,
};

const BasicModal = ({ children, title, color, variant, startIcon }) => {
  const { modal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);

  useEffect(() => {
    if (modal) {
      dispatch(isModalOpen(false));
    }
  }, [dispatch, modal]);

  return (
    <div>
      <Button
        color={color}
        variant={variant}
        onClick={handleOpenClose}
        startIcon={startIcon}
      >
        {title}
      </Button>
      <Modal
        open={open || modal}
        onClose={handleOpenClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
