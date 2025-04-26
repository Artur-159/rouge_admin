import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { isStatusText } from "../../../../store/story/slice";
import { isListVideosImages } from "../../../../store/image/slice";
import { StoryAPI } from "../../../../services/story";
import Toast from "../../../../helpers/status-text";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import AddIcon from "@mui/icons-material/Add";
import Image from "../../../../components/uploads/image/image";
import TextInput from "../../../../components/text-input/text-input";
import VideosImages from "../../../../components/uploads/videos-images/videos-images";

import styles from "../../story.module.scss";

const CreateStory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.story);
  const { image, listVideosImages } = useSelector((state) => state.image);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      main_image: "",
      medias: "",
      sort_number: "",
      url: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.main_image = image;
    data.medias = listVideosImages;
    dispatch(StoryAPI.postStory(data));
  });

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
      <h1> Create Story</h1>
      <div className={styles.create}>
        <div className={styles.inp_box}>
          <div>
            <h4>Number</h4>
            <TextInput
              name="sort_number"
              control={control}
              placeholder={"Sort number"}
              error={errors?.sort_number?.message}
            />
          </div>
          <div>
            <h4>Name</h4>
            <TextInput
              name="name"
              control={control}
              placeholder={"Story name"}
              error={errors?.name?.message}
            />
          </div>
          <div>
            <h4>Link</h4>
            <TextInput name="url" control={control} placeholder={"link"} />
          </div>
        </div>
        <div className={styles.img_box}>
          <div>
            <h4>Image</h4>
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
            <h4>Videos, images</h4>
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
          startIcon={<AddIcon />}
          className={styles.btn_create_edit}
        >
          Create
        </MainButton>
      </div>
    </div>
  );
};

export default CreateStory;
