import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { isStatusText } from "../../../../store/story/slice";
import {
  isImageSlice,
  isListVideosImages,
} from "../../../../store/image/slice";
import { StoryAPI } from "../../../../services/story";
import Toast from "../../../../helpers/status-text";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import EditIcon from "@mui/icons-material/Add";
import Image from "../../../../components/uploads/image/image";
import TextInput from "../../../../components/text-input/text-input";
import VideosImages from "../../../../components/uploads/videos-images/videos-images";

import styles from "../../story.module.scss";

const EditStory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, oneStory } = useSelector((state) => state.story);
  const { image, listVideosImages } = useSelector((state) => state.image);
  let defaultValues = { ...oneStory };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    ...defaultValues,
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.main_image = image;
    data.medias = listVideosImages;
    dispatch(StoryAPI.putUpdateStory(data));
  });

  useEffect(() => {
    dispatch(StoryAPI.getOneStory(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneStory);
  }, [reset, oneStory]);

  useEffect(() => {
    dispatch(isImageSlice(oneStory.main_image));
    dispatch(isListVideosImages(oneStory.story_medias));
  }, [dispatch, oneStory]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/story");
          dispatch(isStatusText(false));
          dispatch(isListVideosImages(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.box}>
      <Back />
      <h1> Edit Story</h1>
      <div className={styles.create}>
        <div className={styles.inp_box}>
          <div>
            <h3>Sort Number</h3>
            <TextInput
              name="sort_number"
              control={control}
              placeholder={"Sort number"}
            />
          </div>
          <div>
            <h3>Story Name</h3>
            <TextInput
              name="name"
              control={control}
              placeholder={"Story name"}
              error={errors.name?.message}
            />
          </div>
          <div>
            <h3>Link</h3>
            <TextInput name="url" control={control} placeholder={"link"} />
          </div>
        </div>
        <div className={styles.img_box}>
          <div>
            <h3>Image</h3>
            <Image
              status={status}
              image={image ? image?.path : null}
              name="main_image"
              control={control}
              className={styles.partner_img}
              error={errors.main_image?.message}
            />
          </div>
          <div>
            <h3>Images</h3>
            <VideosImages
              control={control}
              name={"medias"}
              images={listVideosImages}
            />
          </div>
        </div>
      </div>
      <div>
        <MainButton
          onClick={onSubmit}
          variant={"contained"}
          startIcon={<EditIcon />}
          className={styles.btn_create_edit}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default EditStory;
