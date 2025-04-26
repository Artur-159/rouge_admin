import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VacancyAPI } from "../../services/vacancy";
import { isDeleteVacancy } from "../../store/vacancy/slice";
import { isModalOpen } from "../../store/modal/slice";
import MainButton from "../../components/button/button";
import BasicModal from "../../components/modal/modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Params from "../../helpers/params";

import styles from "./vacancy.module.scss";

const Vacancy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, list } = useSelector((state) => state.vacancy);

  useEffect(() => {
    dispatch(VacancyAPI.getVacancies(Params()));
  }, [dispatch, status]);

  const deleteHandler = (id) => {
    dispatch(VacancyAPI.deleteVacancy(id));
    dispatch(isDeleteVacancy(id));
    dispatch(isModalOpen(false));
  };
  const handlerLinkClick = () => {
    navigate("create");
  };
  const handlerCreateBanner = () => {
    navigate("banner");
  };
  const editHandler = (id) => {
    dispatch(VacancyAPI.getOneVacancy(`${id}`));
    navigate(`${id}`);
  };
  return (
    <div>
      <h1>Vacancy</h1>
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
        {!list.length ? (
          <h4>empty...🥲</h4>
        ) : (
          list?.map((item) => (
            <div key={item.id} className={styles.vacancy_list}>
              <div className={styles.vacancy_info}>
                <div>{item?.item_id}</div>
                <div>{item?.name_am}</div>
              </div>
              <div className={styles.vacancy_btn}>
                <MainButton
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </MainButton>

                <BasicModal
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
                </BasicModal>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Vacancy;
