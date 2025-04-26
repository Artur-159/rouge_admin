import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { AboutAPI } from "../../../../services/about";
import { isStatusText } from "../../../../store/about/slice";
import Toast from "../../../../helpers/status-text";
import TextEditor from "../../../../components/text-editor/text-editor";
import MainButton from "../../../../components/button/button";
import Image from "../../../../components/uploads/image/image";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../about.module.scss";

const Create = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.about);
  const { image } = useSelector((state) => state.image);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      description_am: "",
      description_ru: "",
      description_en: "",
      image: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.image = image;
    dispatch(AboutAPI.postAbout(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={clsx(className, styles.about)}>
      <h2>Create About Us</h2>
      <Image
        name="image"
        control={control}
        image={image?.path}
        errors={errors?.image?.message}
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
        className={styles.btn}
        startIcon={<AddIcon />}
      >
        Create
      </MainButton>
    </div>
  );
};

export default Create;
