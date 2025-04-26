import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { BrandAPI } from "../../../../services/brand";
import { isStatusText } from "../../../../store/brand/slice";
import { isImageSlice } from "../../../../store/image/slice";
import convertBoolToInt from "../../../../helpers/convert-bool-to-int";
import { validation } from "../validation/validation";
import Toast from "../../../../helpers/status-text";
import Button from "../../../../components/button/button";
import TextEditor from "../../../../components/text-editor/text-editor";
import Back from "../../../../components/back-btn/back-btn";
import BrandFormFields from "../../../../components/forms/brand-form/brand-form";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../brands.module.scss";

const CreateBrand = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { image, listVideosImages } = useSelector((state) => state.image);

  const { status } = useSelector((state) => state.brand);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      image: null,
      small_image: "",
      only_at_rouge: "",
      show_in_slider: "",
      only_in_stores: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.image = listVideosImages[0];
    data.small_image = image;
    data.only_at_rouge = convertBoolToInt(data.only_at_rouge);
    data.show_in_slider = convertBoolToInt(data.show_in_slider);
    data.only_in_stores = convertBoolToInt(data.only_in_stores);

    dispatch(BrandAPI.postBrand(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/brand");
          dispatch(isStatusText(false));
          dispatch(isImageSlice(false));
        },
      });
    }
  }, [status, dispatch, reset, navigate]);

  return (
    <>
      <Back />
      <h1>Create Brand</h1>
      <div className={clsx(className, styles.brand_box)}>
        <BrandFormFields
          control={control}
          image={image}
          errors={errors}
          status={status}
          images={listVideosImages}
        />
        <div>
          <div className={styles.text_editor_desks}>
            {["am", "ru", "en"].map((lang, index) => (
              <div key={index}>
                <h3>Description {lang}</h3>
                <TextEditor
                  control={control}
                  name={`description_${lang}`}
                  placeholder={`Description  ${lang}`}
                  className={styles.create_blog_inputs_bnt}
                  error={
                    errors ? errors?.[`description_${lang}`]?.message : null
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <Button
          variant={"contained"}
          startIcon={<AddIcon />}
          className={styles.btn}
          type="submit"
          onClick={onSubmit}
        >
          Create
        </Button>
      </div>
    </>
  );
};

export default memo(CreateBrand);
