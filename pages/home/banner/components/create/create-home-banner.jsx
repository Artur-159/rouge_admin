import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { HomeAPI } from "../../../../../services/home";
import { yupResolver } from "@hookform/resolvers/yup";
import { isStatusText, setBanners } from "../../../../../store/home/slice";
import Toast from "../../../../../helpers/status-text";
import { validation } from "../validation/validation";
import { accumulateBannerData } from "../../../../../utils/home";
import { bannerInputs } from "../../../../../constant/home";
import MainButton from "../../../../../components/button/button";
import Back from "../../../../../components/back-btn/back-btn";
import TextInput from "../../../../../components/text-input/text-input";
import VideosImages from "../upload/videos-images";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../../home.module.scss";

const CreateHomeBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, banners } = useSelector((state) => state.home);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      sort_number: "",
      name: "",
      url_am: "",
      url_ru: "",
      url_en: "",
      path_am: "",
      path_ru: "",
      path_en: "",
      file_type_en: "",
      file_type_ru: "",
      file_type_am: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data = accumulateBannerData(banners, data);
    dispatch(HomeAPI.postHomeBanner(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/home");
          dispatch(isStatusText(false));
        },
      });
    }
    dispatch(setBanners({}));
  }, [status, dispatch, navigate]);

  return (
    <div>
      <Back />
      <h1>Create home banner</h1>
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
          startIcon={<AddIcon />}
        >
          Create
        </MainButton>
      </div>
    </div>
  );
};

export default CreateHomeBanner;
