import { useNavigate } from "react-router";
import MainButton from "../button/button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./back-btn.module.scss";

const Back = ({ variant = "outlined" }) => {
  const navigate = useNavigate();

  return (
    <MainButton
      onClick={() => navigate(-1)}
      variant={variant}
      startIcon={<ArrowBackIcon />}
      className={styles.btn}
    >
      back
    </MainButton>
  );
};

export default Back;
