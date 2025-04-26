import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VacancyAPI } from "../../../../services/vacancy";
import { isStatusText } from "../../../../store/vacancy/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import VacancyForm from "../../../../components/forms/vacancy-form/vacancy-form";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../vacancy.module.scss";

const CreateVacancy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.vacancy);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name_am: "",
      name_ru: "",
      name_en: "",
      answers_am: "",
      answers_ru: "",
      answers_en: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(VacancyAPI.postVacancy(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/vacancy");
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.vacancy}>
      <Back />
      <h1> Create Vacancy</h1>
      <div className={styles.create_vacancy}>
        {["am", "ru", "en"].map((lang, index) => (
          <VacancyForm
            key={index}
            name={`name_${lang}`}
            control={control}
            editorErrorMessage={
              errors ? errors?.[`description_${lang}`]?.message : null
            }
            errors={errors ? errors?.[`name_${lang}`]?.message : null}
            placeholder={`Title ${lang}`}
            className={styles.create_vacancy_inputs_bnt}
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

export default CreateVacancy;
