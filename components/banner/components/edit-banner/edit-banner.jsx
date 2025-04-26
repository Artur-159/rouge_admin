import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { BannerAPI } from "../../../../services/banner";
import { isOneBanner, isStatusText } from "../../../../store/banner/slice";
import { isImageSlice } from "../../../../store/image/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import Toast from "../../../../helpers/status-text";
import Back from "../../../back-btn/back-btn";
import MainButton from "../../../button/button";
import BannerForm from "../../../forms/banner-form/banner-form";
import VideosImages from "../../../uploads/videos-images/videos-images";
import EditIcon from "@mui/icons-material/Edit";
import clsx from "clsx";

import styles from "../../banner.module.scss";

const EditBanner = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const pageName = location?.pathname?.split("/")[1];

  const { status, oneBanner } = useSelector((state) => state.banner);

  let defaultValues = oneBanner;

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
    data.item_name = pageName;
    data.image = oneBanner.image;
    dispatch(BannerAPI.putUpdateBanner(data));
  });

  useEffect(() => {
    reset(oneBanner);
  }, [reset, dispatch, oneBanner]);

  useEffect(() => {
    dispatch(BannerAPI.getOneBanner(pageName));
  }, [dispatch, status, pageName]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate(-1);
          dispatch(isStatusText(false));
          dispatch(isImageSlice(false));
          dispatch(isOneBanner(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={clsx(className, styles.banner)}>
      <Back />
      <h1>Edit {pageName} banner </h1>
      <div>
        {["am", "ru", "en"].map((lang, index) => (
          <BannerForm
            key={index}
            name={`title_${lang}`}
            page={pageName}
            language={lang}
            control={control}
            errors={errors ? errors?.[`title_${lang}`]?.message : null}
            editErrorDesc={
              errors ? errors?.[`description_${lang}`]?.message : null
            }
            placeholder={`Title ${lang}`}
            className={styles.create_faq_inputs_bnt}
          />
        ))}
      </div>
      <VideosImages
        status={status}
        image={oneBanner?.image}
        name="image"
        control={control}
        className={styles.partner_img}
      />

      <MainButton
        variant={"contained"}
        onClick={onSubmit}
        className={styles.btn_edit}
        startIcon={<EditIcon />}
      >
        Edit
      </MainButton>
    </div>
  );
};

export default EditBanner;
