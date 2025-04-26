import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import {
  isImageSlice,
  isListVideosImages,
} from "../../../../store/image/slice";
import { isStatusText } from "../../../../store/service/slice";
import Toast from "../../../../helpers/status-text";
import { BlogAPI } from "../../../../services/blog";
import { validation } from "../validation/validation";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";
import TextInput from "../../../../components/text-input/text-input";
import Image from "../../../../components/uploads/image/image";
import BlogForm from "../../../../components/forms/blog-form/blog-form";
import VideosImages from "../../../../components/uploads/videos-images/videos-images";

import styles from "../../blog.module.scss";

const EditService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { image, listVideosImages } = useSelector((state) => state.image);
  const { status, oneBlog } = useSelector((state) => state.blog);

  const editImage = image ? image : oneBlog.image_for_homepage;
  const editVideos =
    listVideosImages?.length >= 1 ? listVideosImages : oneBlog?.medias;

  const defaultValues = Object.assign({}, oneBlog, {
    link: oneBlog.link === null ? "" : oneBlog.link,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validation),
  });

  useEffect(() => {
    dispatch(isListVideosImages(oneBlog.medias));
  }, [dispatch, oneBlog]);

  useEffect(() => {
    dispatch(BlogAPI.getOneBlog(userId));
  }, [dispatch, userId]);

  const onSubmit = handleSubmit((data) => {
    const updatedData = Object.assign({}, data, {
      image_for_home: image ? image.path : data.image.path,
      media: listVideosImages ? listVideosImages : data.images,
    });

    dispatch(BlogAPI.putUpdateBlog(updatedData));
  });

  useEffect(() => {
    dispatch(BlogAPI.getOneBlog(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneBlog);
    dispatch(isListVideosImages(oneBlog.medias));
    dispatch(isImageSlice(oneBlog.image_for_home));
  }, [reset, dispatch, oneBlog]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully edited", false, {
        onClose: () => {
          navigate("/blog");
          dispatch(isStatusText(false));
          dispatch(isImageSlice(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.blog}>
      <Back />
      <h1> Edit Blog</h1>
      <div className={styles.create_blog}>
        <h3>Priority</h3>
        <TextInput
          type="number"
          control={control}
          name="sort_number"
          placeholder="Priority"
          className={styles.priority}
          error={errors?.sort_number}
        />
        {["am", "ru", "en"].map((lang, index) => (
          <BlogForm
            key={index}
            language={lang}
            control={control}
            name={`name_${lang}`}
            placeholder={`name ${lang}`}
            className={styles.create_blog_inputs_bnt}
            errorDescMessage={
              errors ? errors?.[`description_${lang}`]?.message : null
            }
            errorShortDescMessage={
              errors ? errors?.[`short_description_${lang}`]?.message : null
            }
            errors={errors ? errors?.[`name_${lang}`]?.message : null}
          />
        ))}
        <div className={styles.img_video_list_blog}>
          <div>
            <h3>Image for homepage</h3>
            <Image
              status={status}
              control={control}
              name="image_for_home"
              className={styles.home_img}
              image={editImage && editImage}
              error={errors?.image_for_home?.message}
            />
          </div>
          <div>
            <h3>Images/Videos blog page</h3>
            <VideosImages
              name="medias"
              status={status}
              control={control}
              images={editVideos}
              className={styles.partner_img}
              error={errors.images?.message}
            />
          </div>
          <div className={styles.blog_link}>
            <h3>Link</h3>
            <TextInput name="link" control={control} placeholder="link" />
          </div>
        </div>
        <MainButton
          onClick={onSubmit}
          variant="contained"
          startIcon={<EditIcon />}
          className={styles.create_btn}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default memo(EditService);
