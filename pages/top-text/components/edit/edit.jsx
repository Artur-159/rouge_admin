import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Add";
import { TopTextAPI } from "../../../../services/top-text";
import { TOP_TEXT_FORMS } from "../../../../constant/top-text";
import TextInput from "../../../../components/text-input/text-input";
import MainButton from "../../../../components/button/button";
import MainCheckbox from "../../../../components/checkbox/checkbox";
import Back from "../../../../components/back-btn/back-btn";
import validation from "../validation/validation";
import { isStatusText } from "../../../../store/top-text/slice";
import Toast from "../../../../helpers/status-text";

import styles from "../../top-text.module.scss";

const Edit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oneTopText, status } = useSelector((state) => state.topText);

  const {
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: oneTopText,
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(TopTextAPI.putUpdateTopText(data));
  });

  useEffect(() => {
    dispatch(TopTextAPI.getOneTopText(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset(oneTopText);
  }, [reset, oneTopText]);

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
      <h1>Edit top text</h1>
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
        variant="contained"
        startIcon={<EditIcon />}
        className={styles.btn_create}
      >
        Edit
      </MainButton>
    </div>
  );
};

export default Edit;
