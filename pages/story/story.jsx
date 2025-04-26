import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoryAPI } from "../../services/story";
import { isCleanData, isDeleteStory } from "../../store/story/slice";
import { isModalOpen } from "../../store/modal/slice";
import { isImageSlice, isListVideosImages } from "../../store/image/slice";
import Params from "../../helpers/params";
import MainButton from "../../components/button/button";
import BasicModal from "../../components/modal/modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import styles from "./story.module.scss";

const Story = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, data } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(StoryAPI.getStories(Params()));
    dispatch(isImageSlice(false));
    dispatch(isListVideosImages(false));
    dispatch(isCleanData(false));
  }, [dispatch, status]);

  const deleteHandler = (id) => {
    dispatch(StoryAPI.deleteStory(id));
    dispatch(isDeleteStory(id));
    dispatch(isModalOpen(false));
  };

  const handlerLinkClick = () => {
    navigate("create");
  };

  const editHandler = (id) => {
    dispatch(StoryAPI.getOneStory(`${id}`));
    navigate(`${id}`);
  };

  return (
    <div>
      <h1>Story</h1>
      <MainButton
        onClick={handlerLinkClick}
        startIcon={<AddIcon />}
        variant={"contained"}
        className={styles.btn_create}
      >
        Create
      </MainButton>
      <div>
        {!data?.length ? (
          <h4>empty...🥲</h4>
        ) : (
          data?.map((item) => (
            <div key={item.id} className={styles.list}>
              <div className={styles.info}>
                <div>{item?.sort_number}</div>
                <div>{item?.name}</div>
              </div>
              <div className={styles.btn}>
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
        )}
      </div>
    </div>
  );
};

export default Story;
