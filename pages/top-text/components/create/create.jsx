import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "../validation/validation";
import { TopTextAPI } from "../../../../services/top-text";
import { isStatusText } from "../../../../store/top-text/slice";
import { TOP_TEXT_FORMS } from "../../../../constant/top-text";
import Toast from "../../../../helpers/status-text";
import convertBoolToInt from "../../../../helpers/convert-bool-to-int";
import MainButton from "../../../../components/button/button";
import TextInput from "../../../../components/text-input/text-input";
import MainCheckbox from "../../../../components/checkbox/checkbox";
import Back from "../../../../components/back-btn/back-btn";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../top-text.module.scss";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.topText);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name_am: "",
      name_ru: "",
      name_en: "",
      active: false,
      url: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.active = convertBoolToInt(data.active);
    dispatch(TopTextAPI.postTopText(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate(-1);
          dispatch(isStatusText());
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div>
      <Back />
      <h2>Create top text</h2>
      <div className={styles.forms}>
        {TOP_TEXT_FORMS.map((inp, i) => (
          <TextInput
            key={i}
            name={inp.name}
            control={control}
            placeholder={inp.placeholder}
            error={errors[inp.name]?.message}
          />
        ))}
      </div>
      <MainCheckbox
        id="active"
        text="Active"
        name="active"
        control={control}
        className={styles.checkbox}
      />
      <MainButton
        onClick={onSubmit}
        variant={"contained"}
        startIcon={<AddIcon />}
        className={styles.btn_create}
      >
        Create
      </MainButton>
    </div>
  );
};

export default Create;
