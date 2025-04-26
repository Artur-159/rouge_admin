import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import { BranchAPI } from "../../../../services/branch";
import { isStatusText } from "../../../../store/branch/slice";
import { isListVideosImages } from "../../../../store/image/slice";
import Toast from "../../../../helpers/status-text";
import Back from "../../../../components/back-btn/back-btn";
import MainButton from "../../../../components/button/button";
import BranchForm from "../../../../components/forms/branch-form/branch-form";
import { checkboxItems } from "../../../../constant/branch";
import CheckboxGroup from "../../../../components/forms/branch-form/checkbox-group";
import CoordinateInput from "../../../../components/forms/branch-form/coordinate-input";
import Image from "../../../../components/uploads/image/image";
import convertBoolToInt from "../../../../helpers/convert-bool-to-int";
import AddIcon from "@mui/icons-material/Add";

import styles from "../../branch.module.scss";

const CreateBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.branch);
  const { image } = useSelector((state) => state.image);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name_am: "",
      name_ru: "",
      name_en: "",
      address_am: "",
      address_ru: "",
      address_en: "",
      coordinate_x: "",
      coordinate_y: "",
      image: "",
      head_office: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = handleSubmit((data) => {
    data.head_office = convertBoolToInt(data.head_office);
    data.image = image;
    dispatch(BranchAPI.postBranch(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/branch");
          dispatch(isStatusText(false));
          dispatch(isListVideosImages(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.branch}>
      <Back />
      <h1> Create Branch</h1>
      <div className={styles.create_branch}>
        <div className={styles.img_slc_inp}>
          <CoordinateInput control={control} errors={errors} />
          <CheckboxGroup
            control={control}
            items={checkboxItems}
            className={styles.checkboxGroup}
          />
        </div>
        <div>
          <h4>Image</h4>
          <Image
            name="image"
            status={status}
            control={control}
            error={errors.image?.message}
            className={styles.partner_img}
            image={image ? image?.path : null}
          />
        </div>
        <div className={styles.create_branch_inputs_bnt}>
          {["am", "ru", "en"].map((lang, index) => (
            <BranchForm
              lang={lang}
              key={index}
              language={lang}
              control={control}
              name={`name_${lang}`}
              placeholder={`Address ${lang}`}
              errors={errors ? errors?.[`address_${lang}`]?.message : null}
              errorsName={errors ? errors?.[`name_${lang}`]?.message : null}
            />
          ))}
        </div>

        <MainButton
          onClick={onSubmit}
          variant={"contained"}
          startIcon={<AddIcon />}
          className={styles.btn_create}
        >
          Create
        </MainButton>
      </div>
    </div>
  );
};

export default CreateBranch;
