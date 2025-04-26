import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AboutAPI } from "../../../../services/about";
import { isStatusText } from "../../../../store/about/slice";
import clsx from "clsx";
import { validation } from "../validation/validation";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";
import TextEditor from "../../../../components/text-editor/text-editor";
import Image from "../../../../components/uploads/image/image";
import Edit from "@mui/icons-material/Edit";

import styles from "../../about.module.scss";
import { isImageSlice } from "../../../../store/image/slice";

const Create = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, data } = useSelector((state) => state.about);
  const { image } = useSelector((state) => state.image);

  let defaultValues = data;
  // let editImage = image ? image.path : data.image.path;

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
    data.image = image;
    dispatch(AboutAPI.postAbout(data));
  });

  useEffect(() => {
    reset(data);
    dispatch(isImageSlice(data.image));
  }, [reset, dispatch, data]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/about");
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={clsx(className, styles.about)}>
      <h2>Edit About Us</h2>
      <Image
        control={control}
        errors={errors?.images?.message}
        image={image?.path}
        name={"image"}
      />
      {["am", "ru", "en"].map((lang, index) => (
        <div key={index}>
          <h3>{`Description ${lang}`}</h3>
          <TextEditor
            control={control}
            name={`description_${lang}`}
            className={styles.about_info}
            placeholder={`Description ${lang}`}
            errors={errors?.[`description_${lang}`]?.message}
          />
        </div>
      ))}
      <MainButton
        onClick={onSubmit}
        variant="contained"
        startIcon={<Edit />}
        className={styles.btn}
      >
        Edit
      </MainButton>
    </div>
  );
};

export default Create;
