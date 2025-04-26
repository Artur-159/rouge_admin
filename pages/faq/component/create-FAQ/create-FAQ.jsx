import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";

import { FaqAPI } from "../../../../services/FAQ";
import { isStatusText } from "../../../../store/faq/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import Back from "../../../../components/back-btn/back-btn";
import TextInput from "../../../../components/text-input/text-input";
import MainButton from "../../../../components/button/button";
import RenderInputSection from "../../../../components/forms/faq-form/form-FAQ";

import styles from "../../faq.module.scss";

const CreateFAQ = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.faq);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      question_am: "",
      question_ru: "",
      question_en: "",
      answer_am: "",
      answer_ru: "",
      answer_en: "",
      sort_number: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(FaqAPI.postFAQ(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/faq");
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.faq}>
      <Back />
      <h1> Create Frequently Asked Question </h1>
      <div className={styles.create_faq}>
        <h3>Priority</h3>
        <TextInput
          type="number"
          control={control}
          name="sort_number"
          placeholder="Priority"
          className={styles.priority}
          error={errors ? errors.sort_number?.message : null}
        />
        {["am", "ru", "en"].map((lang, index) => (
          <RenderInputSection
            key={index}
            lang={lang}
            control={control}
            name={`question_${lang}`}
            placeholder={`Question ${lang}`}
            className={styles.create_faq_inputs_bnt}
            editorErrorMessage={
              errors ? errors?.[`answer_${lang}`]?.message : null
            }
            errors={errors ? errors?.[`question_${lang}`]?.message : null}
          />
        ))}
        <MainButton
          onClick={onSubmit}
          variant="contained"
          startIcon={<AddIcon />}
          className={styles.btn_create}
        >
          Create
        </MainButton>
      </div>
    </div>
  );
};

export default CreateFAQ;
