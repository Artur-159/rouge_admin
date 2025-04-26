import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup";
import { BannerAPI } from "../../../../services/banner";
import { isOneBanner, isStatusText } from "../../../../store/banner/slice";
import { isImageSlice } from "../../../../store/image/slice";
import VideosImages from "../../../uploads/videos-images/videos-images";
import Toast from "../../../../helpers/status-text";
import Back from "../../../back-btn/back-btn";
import MainButton from "../../../button/button";
import BannerForm from "../../../forms/banner-form/banner-form";
import { validation } from "../validation/validation";

import styles from "../../banner.module.scss";

const CreateBanner = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const pageName = location?.pathname?.split("/")[1];

  const { status } = useSelector((state) => state.banner);
  const { image } = useSelector((state) => state.image);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      description_am: "",
      description_ru: "",
      description_en: "",
      title_am: "",
      title_ru: "",
      title_en: "",
      item_name: "",
      image: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.item_name = pageName;
    data.image = image?.path;
    dispatch(BannerAPI.postBanner(data));
  });

  useEffect(() => {
    dispatch(BannerAPI.getOneBanner(pageName));
  }, [dispatch, status, pageName]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          dispatch(isStatusText(false));
          dispatch(isImageSlice(false));
          dispatch(isOneBanner(false));
          navigate(-1);
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={clsx(className, styles.banner)}>
      <Back />
      <h1>Create {pageName} Banner </h1>
      <div>
        {["am", "ru", "en"].map((lang, index) => (
          <BannerForm
            key={index}
            name={`title_${lang}`}
            page={pageName}
            language={lang}
            control={control}
            editorErrorMessage={
              errors ? errors?.[`title_${lang}`]?.message : null
            }
            errors={errors ? errors?.[`description_${lang}`]?.message : null}
            placeholder={`Title ${lang}`}
            className={styles.create_faq_inputs_bnt}
          />
        ))}
      </div>
      <>
        <h4>Videos/images</h4>
        <VideosImages
          status={status}
          image={image?.path}
          name="images"
          control={control}
          className={styles.partner_img}
        />
      </>
      <MainButton
        variant={"contained"}
        onClick={onSubmit}
        className={styles.btn_create}
        startIcon={<AddIcon />}
      >
        Create
      </MainButton>
    </div>
  );
};

export default CreateBanner;
