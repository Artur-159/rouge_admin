import { useNavigate } from "react-router";
import MainButton from "../../components/button/button";
import AddIcon from "@mui/icons-material/Add";
import TopTextList from "./components/list/list";

import styles from "./top-text.module.scss";

const TopText = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Top Text</h1>
      <div className={styles.actions}>
        <MainButton
          variant="contained"
          startIcon={<AddIcon />}
          className={styles.btn_create}
          onClick={() => navigate("create")}
        >
          Create
        </MainButton>
      </div>
      <TopTextList />
    </div>
  );
};

export default TopText;
