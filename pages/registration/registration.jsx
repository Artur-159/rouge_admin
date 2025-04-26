import { API } from "../../store/API";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../component/text-input/text-input";
import MainButton from "../../component/button/button";

import styles from "./registration.module.scss";
import { AuthorizationAPI } from "../../services/authorization";

const Registration = () => {
  //   const { isAuth } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(AuthorizationAPI.postRegSubAdmin(data));
    // navigate("/home");
  });

  return (
    <div className={styles.reg}>
      <h1>Registration</h1>
      <div>
        <TextInput
          type="text"
          name="name"
          placeholder="name"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
        <TextInput
          type="email"
          name="email"
          placeholder="email"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
        <TextInput
          type="phone"
          name="phone"
          placeholder="phone"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
      </div>
      <div>
        <TextInput
          type="password"
          name="password"
          placeholder="password"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
        <TextInput
          type="password"
          name="password_confirmation"
          placeholder="password confirmation"
          control={control}
          errors={errors}
          className={styles.reg_input}
        />
      </div>
      <div className={styles.btn_log_reg}>
        <MainButton
          variant={"contained"}
          className={styles.btn}
          type="submit"
          onClick={onSubmit}
        >
          Registration
        </MainButton>
      </div>
    </div>
  );
};
export default Registration;
