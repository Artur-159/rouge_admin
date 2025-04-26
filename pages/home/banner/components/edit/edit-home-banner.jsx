import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { HomeAPI } from "../../../../../services/home";
import Toast from "../../../../../helpers/status-text";
import { isStatusText, setBanners } from "../../../../../store/home/slice";
import TextInput from "../../../../../components/text-input/text-input";
import MainButton from "../../../../../components/button/button";
import Back from "../../../../../components/back-btn/back-btn";
import VideosImages from "../upload/videos-images";
import { validation } from "../validation/validation";
import { accumulateBannerData } from "../../../../../utils/home";
import { bannerInputs } from "../../../../../constant/home";

import styles from "../../../home.module.scss";

const EditHomeBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, oneHomeBanner, banners } = useSelector((state) => state.home);

  const defaultValues = {
    ...oneHomeBanner,
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data = accumulateBannerData(banners, data);
    dispatch(HomeAPI.putUpdateHomeBanner(data));
  });

  useEffect(() => {
    dispatch(HomeAPI.getOneHomeBanner(userId));
    dispatch(setBanners({}));
  }, [dispatch, userId]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/home");
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  useEffect(() => {
    reset(oneHomeBanner);
  }, [reset, dispatch, oneHomeBanner]);

  return (
    <div>
      <Back />
      <h1>Edit home banner</h1>
      <div>
        <div className={styles.home_banner_inp}>
          {bannerInputs.map((inp, index) => (
            <TextInput
              key={index}
              type={inp.type}
              name={inp.name}
              control={control}
              placeholder={inp.placeholder}
              error={errors?.[inp.name]?.message}
            />
          ))}
        </div>

        <div>
          {["am", "ru", "en"].map((lang, index) => (
            <div key={index} className={styles.home_banner_inp}>
              <VideosImages
                status={status}
                multiple={false}
                control={control}
                name={`path_${lang}`}
                images={banners[`path_${lang}`]}
                error={errors?.[`path_${lang}`]?.message}
                title={`Choose video / image for ${lang}`}
              />
              <TextInput
                type="text"
                control={control}
                name={`url_${lang}`}
                placeholder={`URL ${lang}`}
                error={errors?.[`url_${lang}`]?.message}
              />
            </div>
          ))}
        </div>
        <MainButton
          onClick={onSubmit}
          variant={"contained"}
          className={styles.btn}
          startIcon={<EditIcon />}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default EditHomeBanner;
