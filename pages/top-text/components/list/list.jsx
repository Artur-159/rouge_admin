import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TopTextAPI } from "../../../../services/top-text";
import { isDeleteTopTextId } from "../../../../store/top-text/slice";
import { isModalOpen } from "../../../../store/modal/slice";
import MainButton from "../../../../components/button/button";
import Params from "../../../../helpers/params";
import BasicModal from "../../../../components/modal/modal";

import styles from "../../top-text.module.scss";

const TopTextList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.topText);

  const deleteHandler = (id) => {
    dispatch(TopTextAPI.deleteTopText(id));
    dispatch(isDeleteTopTextId(id));
    dispatch(isModalOpen(false));
  };

  const editHandler = (id) => {
    dispatch(TopTextAPI.getOneTopText(`${id}`));
    navigate(`${id}`);
  };

  useEffect(() => {
    dispatch(TopTextAPI.getTopTexts(Params()));
  }, [dispatch]);

  return (
    <div>
      <div>
        {list?.length > 0 ? (
          list.map((item) => (
            <div key={item.id} className={styles.list_item}>
              <div>{item?.name_en}</div>
              <div className={styles.list_btn}>
                <MainButton
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </MainButton>

                <BasicModal
                  color="error"
                  title="Delete"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                >
                  <p>
                    Are you sure you want to proceed with this action? This
                    action cannot be undone.
                  </p>
                  <MainButton
                    color="error"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteHandler(item.id)}
                  >
                    Delete
                  </MainButton>
                </BasicModal>
              </div>
            </div>
          ))
        ) : (
          <h4>empty...🥲</h4>
        )}
      </div>
    </div>
  );
};

export default TopTextList;
