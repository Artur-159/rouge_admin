import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { BlogAPI } from "../../services/blog";
import { isDeleteBlog, isOneBlog, isStatusText } from "../../store/blog/slice";
import { isModalOpen } from "../../store/modal/slice";
import { isImageSlice, isListVideosImages } from "../../store/image/slice";
import MainButton from "../../components/button/button";
import BasicModal from "../../components/modal/modal";
import params from "../../helpers/params";

import styles from "./blog.module.scss";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, list } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(BlogAPI.getBlogs(params()));
    dispatch(isImageSlice(false));
    dispatch(isListVideosImages(false));
    dispatch(isStatusText(false));
    dispatch(isOneBlog(false));
  }, [dispatch, status]);

  const deleteHandler = (id) => {
    dispatch(BlogAPI.deleteBlog(id));
    dispatch(isDeleteBlog(id));
    dispatch(isModalOpen(false));
  };

  const handlerLinkClick = () => {
    navigate("create");
  };

  const handlerCreateBanner = () => {
    navigate("banner");
  };

  const editHandler = (id) => {
    dispatch(BlogAPI.getOneBlog(`${id}`));
    navigate(`${id}`);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <MainButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handlerLinkClick}
        className={styles.btn_create}
      >
        Create
      </MainButton>
      <MainButton
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handlerCreateBanner}
        className={styles.create_banner}
      >
        banner
      </MainButton>

      <div>
        {list?.length ? (
          list?.map((item) => (
            <div key={item.id} className={styles.blog_list}>
              <div className={styles.blog_info}>
                <div>{item?.sort_number}</div>
                <div>{item?.name_am}</div>
              </div>
              <div className={styles.blog_btn}>
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
        ) : (
          <h4>empty...🥲</h4>
        )}
      </div>
    </div>
  );
};

export default Blog;
