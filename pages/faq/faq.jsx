import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { isDeleteFAQId } from "../../store/faq/slice";
import { FaqAPI } from "../../services/FAQ";
import { isModalOpen } from "../../store/modal/slice";
import Modal from "../../components/modal/modal";
import MainButton from "../../components/button/button";
import Params from "../../helpers/params";

import styles from "./faq.module.scss";

const ListFAQ = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, listFAQ } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(FaqAPI.getFAQ(Params()));
  }, [dispatch, status]);

  const deleteHandler = (id) => {
    dispatch(FaqAPI.deleteFAQ(id));
    dispatch(isDeleteFAQId(id));
    dispatch(isModalOpen(false));
  };

  const editHandler = (id) => {
    dispatch(FaqAPI.getOneFAQ(`${id}`));
    navigate(`${id}`);
  };
  const handlerLinkClick = () => {
    navigate("create");
  };
  const handlerCreateBanner = () => {
    navigate("banner");
  };

  return (
    <div className={clsx(className)}>
      <h1>Frequently asked questions </h1>
      <MainButton
        onClick={handlerLinkClick}
        startIcon={<AddIcon />}
        variant={"contained"}
        className={styles.btn_create}
      >
        Create
      </MainButton>
      <MainButton
        onClick={handlerCreateBanner}
        startIcon={<EditIcon />}
        variant={"contained"}
        className={styles.create_banner}
      >
        banner
      </MainButton>

      <div>
        {!listFAQ.length ? (
          <h4>empty...🥲</h4>
        ) : (
          listFAQ?.map((item) => (
            <div key={item.id} className={styles.question_list}>
              <div className={styles.question_info}>
                <div>{item?.sort_number}</div>
                <div>{item?.question_am}</div>
              </div>
              <div className={styles.question_btn}>
                <MainButton
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </MainButton>

                <Modal
                  variant="contained"
                  title="Delete"
                  color="error"
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
                </Modal>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListFAQ;
