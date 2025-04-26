import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ServiceAPI } from "../../../../services/service";
import { isStatusText } from "../../../../store/service/slice";
import { isImageSlice } from "../../../../store/image/slice";
import Toast from "../../../../helpers/status-text";
import { SELECT_INFO } from "../../../../constant/service";
import { validation } from "../validation/validation";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import ServiceForm from "../../../../components/forms/service-form/service-form";
import TextInput from "../../../../components/text-input/text-input";
import MainSelect from "../../../../components/main-select/main-select";
import Media from "../../../../components/uploads/media/media";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../service.module.scss";

const CreateService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.service);
  const { image } = useSelector((state) => state.image);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title_am: "",
      title_ru: "",
      title_en: "",
      description_am: "",
      description_ru: "",
      description_en: "",
      price: "",
      image: "",
      option: "",
      is_video: 0,
    },
    resolver: yupResolver(validation),
  });
  const onSubmit = handleSubmit((data) => {
    data.image = image?.path;
    data.option = data?.option?.value;
    dispatch(ServiceAPI.postService(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/service");
          dispatch(isStatusText(false));
          dispatch(isImageSlice(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.service}>
      <Back />
      <h1> Create Service</h1>
      <div className={styles.create_service}>
        <div className={styles.img_slc_inp}>
          <TextInput
            control={control}
            name={"price"}
            type={"number"}
            placeholder={"Price"}
            error={!!errors.price}
          />

          <Media
            name="image"
            status={status}
            control={control}
            image={image && image?.path}
            className={styles.partner_img}
            error={errors.image?.message}
          />

          <MainSelect
            name={"option"}
            control={control}
            options={SELECT_INFO}
            error={errors.option?.message}
            className={styles.service_select}
          />
        </div>
        {["am", "ru", "en"].map((lang, index) => (
          <ServiceForm
            key={index}
            name={`title_${lang}`}
            control={control}
            editorErrorMessage={
              errors ? errors?.[`description_${lang}`]?.message : null
            }
            errors={errors ? errors?.[`title_${lang}`]?.message : null}
            placeholder={`Title ${lang}`}
            className={styles.create_service_inputs_bnt}
          />
        ))}
        <MainButton
          variant={"contained"}
          onClick={onSubmit}
          className={styles.btn_create}
          startIcon={<AddIcon />}
        >
          Create
        </MainButton>
      </div>
    </div>
  );
};

export default CreateService;
