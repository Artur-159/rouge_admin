import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isStatusText } from "../../../../store/vacancy/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import MainButton from "../../../../components/button/button";
import VacancyForm from "../../../../components/forms/vacancy-form/vacancy-form";
import Back from "../../../../components/back-btn/back-btn";
import EditIcon from "@mui/icons-material/Edit";

import styles from "../../vacancy.module.scss";
import { VacancyAPI } from "../../../../services/vacancy";

const EditVacancy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams();

  const { status, oneVacancy } = useSelector((state) => state.vacancy);
  let defaultValues = oneVacancy;

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
    dispatch(VacancyAPI.getOneVacancy(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneVacancy);
  }, [reset, oneVacancy]);

  const onSubmit = handleSubmit((data) => {
    dispatch(VacancyAPI.putUpdateVacancy(data));
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
      <h1> Edit Vacancy</h1>
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
          startIcon={<EditIcon />}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default EditVacancy;
