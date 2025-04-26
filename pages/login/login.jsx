import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isStatusText } from "../../store/authorization/slice";
import { AuthorizationAPI } from "../../services/authorization";
import TextInput from "../../components/text-input/text-input";
import MainButton from "../../components/button/button";
import styles from "./login.module.scss";
import Toast from "../../helpers/status-text";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.authorization);
  const isAuth = localStorage.getItem("token");

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(AuthorizationAPI.postAuthorization(data));
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
      dispatch(isStatusText(false));
    }

    if (status) {
      Toast.success("Welcome!🙂 You have successfully logged in", 2300, {
        onClose: () => {
          navigate("/home");
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate, isAuth]);

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <TextInput
        control={control}
        errors={errors}
        type="login"
        name="email"
        placeholder="email"
        className={styles.login_input}
      />
      <TextInput
        control={control}
        errors={errors}
        name="password"
        type="password"
        placeholder="password"
        className={styles.login_input}
      />
      <div className={styles.btn_log_reg}>
        <MainButton
          type="submit"
          onClick={onSubmit}
          variant={"contained"}
          className={styles.btn}
        >
          Login
        </MainButton>
      </div>
    </div>
  );
};

export default Login;
