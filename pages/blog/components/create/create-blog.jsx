import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlogAPI } from "../../../../services/blog";
import { isStatusText } from "../../../../store/blog/slice";
import { isImageSlice } from "../../../../store/image/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import BlogForm from "../../../../components/forms/blog-form/blog-form";
import TextInput from "../../../../components/text-input/text-input";
import VideosImages from "../../../../components/uploads/videos-images/videos-images";
import Image from "../../../../components/uploads/image/image";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../blog.module.scss";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.blog);
  const { image, listVideosImages } = useSelector((state) => state.image);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name_am: "",
      name_ru: "",
      name_en: "",
      description_am: "",
      description_ru: "",
      description_en: "",
      short_description_am: "",
      short_description_ru: "",
      short_description_en: "",
      image_for_home: "",
      sort_number: "",
      link: "",
      medias: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.link) {
      delete data.link;
    }
    data.image_for_home = image?.path;
    data.medias = listVideosImages;
    dispatch(BlogAPI.postBlog(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully created", false, {
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
      <h1> Create Blog</h1>
      <div className={styles.create_blog}>
        <h3>Priority</h3>
        <TextInput
          type="number"
          control={control}
          name="sort_number"
          placeholder="Priority"
          error={errors?.sort_number?.message}
        />
        {["am", "ru", "en"].map((lang, index) => (
          <BlogForm
            key={index}
            language={lang}
            control={control}
            name={`name_${lang}`}
            errorDescMessage={
              errors ? errors?.[`description_${lang}`]?.message : null
            }
            errorShortDescMessage={
              errors ? errors?.[`short_description_${lang}`]?.message : null
            }
            errors={errors ? errors?.[`name_${lang}`]?.message : null}
            placeholder={`name ${lang}`}
            className={styles.create_blog_inputs_bnt}
          />
        ))}
        <div className={styles.img_video_list_blog}>
          <div>
            <h3>Image for homepage</h3>
            <Image
              status={status}
              control={control}
              name="image_for_home"
              image={image && image?.path}
              error={errors.image_for_home?.message}
            />
          </div>
          <div>
            <h3>Images/Videos for blog page</h3>
            <VideosImages
              name="media"
              status={status}
              control={control}
              images={listVideosImages}
              className={styles.partner_img}
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
          startIcon={<AddIcon />}
          className={styles.create_btn}
        >
          Create
        </MainButton>
      </div>
    </div>
  );
};

export default CreateBlog;
