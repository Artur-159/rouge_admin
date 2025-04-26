import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EditIcon from "@mui/icons-material/Edit";
import { FaqAPI } from "../../../../services/FAQ";
import { isStatusText } from "../../../../store/faq/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import TextInput from "../../../../components/text-input/text-input";
import MainButton from "../../../../components/button/button";
import RenderInputSection from "../../../../components/forms/faq-form/form-FAQ";
import Back from "../../../../components/back-btn/back-btn";

import styles from "../../faq.module.scss";

const EdiFAQ = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, oneList } = useSelector((state) => state.faq);
  const defaultValues = oneList;

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(FaqAPI.putUpdateFAQ(data));
  });

  useEffect(() => {
    dispatch(FaqAPI.getOneFAQ(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneList);
  }, [reset, oneList]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate(-1);
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.faq}>
      <Back />
      <div className={styles.create_faq}>
        <TextInput
          name="sort_number"
          control={control}
          errors={errors}
          className={styles.priority}
          placeholder="Priority"
          type={"number"}
        />
        {["am", "ru", "en"].map((lang, index) => (
          <RenderInputSection
            key={index}
            lang={lang}
            control={control}
            name={`question_${lang}`}
            errors={errors ? errors?.[`question_${lang}`]?.message : null}
            editorErrorMessage={
              errors ? errors?.[`answers_${lang}`]?.message : null
            }
            placeholder={`Question ${lang}`}
            className={styles.create_faq_inputs_bnt}
          />
        ))}
        <MainButton
          onClick={onSubmit}
          variant={"contained"}
          startIcon={<EditIcon />}
          className={styles.btn_create}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default EdiFAQ;
