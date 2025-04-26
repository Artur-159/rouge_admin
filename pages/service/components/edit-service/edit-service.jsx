import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { ServiceAPI } from "../../../../services/service";
import { isImageSlice } from "../../../../store/image/slice";
import { isStatusText } from "../../../../store/service/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import { SELECT_INFO } from "../../../../constant/service";
import MainButton from "../../../../components/button/button";
import Back from "../../../../components/back-btn/back-btn";
import TextInput from "../../../../components/text-input/text-input";
import Media from "../../../../components/uploads/media/media";
import MainSelect from "../../../../components/main-select/main-select";
import ServiceForm from "../../../../components/forms/service-form/service-form";

import styles from "../../service.module.scss";

const EditService = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { userId } = useParams();

  const { image } = useSelector((state) => state.image);
  const { status, oneService } = useSelector((state) => state.service);

  let defaultValues = oneService;
  let editImage = image ? image.path : oneService.image;

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
    dispatch(ServiceAPI.getOneService(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneService);
  }, [reset, oneService, image]);

  const onSubmit = handleSubmit((data) => {
    data.image = image ? image.path : data.image;
    data.option =
      data.option === oneService.option ? oneService.option : data.option.value;
    dispatch(ServiceAPI.putUpdateService(data));
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
      <h1> Edit Service</h1>
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
            editImage={editImage}
            className={styles.partner_img}
            error={errors?.image?.message}
          />
          <MainSelect
            name={"option"}
            control={control}
            options={SELECT_INFO}
            className={styles.service_select}
            // error={!!errors.option}
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
          startIcon={<EditIcon />}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default EditService;
