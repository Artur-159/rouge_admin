import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { BrandAPI } from "../../../../services/brand";
import { yupResolver } from "@hookform/resolvers/yup";
import { isStatusText } from "../../../../store/brand/slice";
import {
  isImageSlice,
  isListVideosImages,
} from "../../../../store/image/slice";
import Toast from "../../../../helpers/status-text";
import { validation } from "../validation/validation";
import Button from "../../../../components/button/button";
import clsx from "clsx";
import TextEditor from "../../../../components/text-editor/text-editor";
import BrandFormFields from "../../../../components/forms/brand-form/brand-form";
import Back from "../../../../components/back-btn/back-btn";
import convertBoolToInt from "../../../../helpers/convert-bool-to-int";
import EditIcon from "@mui/icons-material/Edit";

import styles from "../../brands.module.scss";

const EditBrand = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { image, listVideosImages } = useSelector((state) => state.image);
  const { editBrand, status } = useSelector((state) => state.brand);

  let defaultValues = editBrand;
  let only_at_rouge = convertBoolToInt(editBrand.only_at_rouge);
  let show_in_slider = convertBoolToInt(
    editBrand.show_in_slider === true ? 1 : 0
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    ...defaultValues,
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.only_at_rouge = convertBoolToInt(
      data.only_at_rouge === 1 || data.only_at_rouge === true ? 1 : 0
    );
    data.show_in_slider = convertBoolToInt(
      data.show_in_slider === 1 || data.show_in_slider === true ? 1 : 0
    );

    data.image = listVideosImages[0];
    data.small_image = image;
    dispatch(BrandAPI.putOneBrand(data));
  });

  useEffect(() => {
    dispatch(BrandAPI.getOneBrand(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(editBrand);
  }, [dispatch, userId, reset, editBrand]);

  useEffect(() => {
    if (editBrand.id > 0) {
      dispatch(isImageSlice(editBrand.small_image));
      dispatch(isListVideosImages([editBrand.image]));
    }
  }, [dispatch, editBrand]);

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
  }, [status, dispatch, navigate]);

  return (
    <>
      <Back />
      <h1>Edit Brand</h1>
      <div className={clsx(className, styles.brand_box)}>
        <BrandFormFields
          image={image}
          errors={errors}
          status={status}
          control={control}
          images={listVideosImages}
          checked={{ only_at_rouge, show_in_slider }}
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
          type="submit"
          onClick={onSubmit}
          variant={"contained"}
          className={styles.btn}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default memo(EditBrand);
