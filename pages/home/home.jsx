import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MainButton from "../../components/button/button";
import { HomeAPI } from "../../services/home";
import params from "../../helpers/params";
import BasicModal from "../../components/modal/modal";
import { isModalOpen } from "../../store/modal/slice";
import { isDeleteHomeBannerId } from "../../store/home/slice";

import styles from "./home.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    status,
    list: { homeBanners },
  } = useSelector((state) => state.home);

  const handlerLinkClick = () => {
    navigate("create");
  };

  const editHandler = (id) => {
    dispatch(HomeAPI.getOneHomeBanner(`${id}`));
    navigate(`${id}`);
  };

  const deleteHandler = (id) => {
    dispatch(HomeAPI.deleteHomeBanner(id));
    dispatch(isDeleteHomeBannerId(id));
    dispatch(isModalOpen(false));
  };

  useEffect(() => {
    dispatch(HomeAPI.getHomeBanners(params()));
  }, [dispatch, status]);

  return (
    <div className={styles.home}>
      <h1>Home</h1>

      <h3>Banner</h3>
      <MainButton
        onClick={handlerLinkClick}
        startIcon={<AddIcon />}
        variant={"contained"}
      >
        Create
      </MainButton>
      <div>
        {!homeBanners?.length ? (
          <h4>empty...🥲</h4>
        ) : (
          homeBanners?.map((item) => (
            <div key={item.id} className={styles.home__banner__list}>
              <div>
                <div>{item?.name}</div>
              </div>
              <div className={styles.home__banner__list__btn}>
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
                    className={styles.home_banner}
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

export default Home;
