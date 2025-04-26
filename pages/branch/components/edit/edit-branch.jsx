import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { isStatusText } from "../../../../store/branch/slice";
import { BranchAPI } from "../../../../services/branch";
import { isImageSlice } from "../../../../store/image/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "../validation/validation";
import Toast from "../../../../helpers/status-text";
import MainButton from "../../../../components/button/button";
import BranchForm from "../../../../components/forms/branch-form/branch-form";
import CheckboxGroup from "../../../../components/forms/branch-form/checkbox-group";
import CoordinateInput from "../../../../components/forms/branch-form/coordinate-input";
import Back from "../../../../components/back-btn/back-btn";
import Image from "../../../../components/uploads/image/image";
import EditIcon from "@mui/icons-material/Edit";
import { checkboxItems } from "../../../../constant/branch";

import styles from "../../branch.module.scss";

const EditBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { image } = useSelector((state) => state.image);
  const { status, oneBranch } = useSelector((state) => state.branch);

  let defaultValues = oneBranch;

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
    data.head_office =
      data.head_office === 1 || data.head_office === true ? 1 : 0;
    data.franchise = data.franchise === 1 || data.franchise === true ? 1 : 0;
    data.image = image;
    dispatch(BranchAPI.putUpdateBranch(data));
  });

  useEffect(() => {
    dispatch(BranchAPI.getOneBranch(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneBranch);
    dispatch(isImageSlice(oneBranch.image));
  }, [reset, dispatch, oneBranch]);

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/branch");
          dispatch(isStatusText(false));
        },
      });
    }
  }, [status, dispatch, navigate]);

  return (
    <div className={styles.branch}>
      <Back />
      <h1>Edit Branch</h1>
      <div className={styles.create_branch}>
        <div className={styles.img_slc_inp}>
          <CoordinateInput control={control} errors={errors} />
          <CheckboxGroup
            control={control}
            items={checkboxItems}
            className={styles.CheckboxGroup}
          />
        </div>
        <div>
          <Image
            status={status}
            image={image ? image?.path : null}
            name="image"
            control={control}
            className={styles.partner_img}
            error={errors.image?.message}
          />
        </div>
        <div className={styles.create_branch_inputs_bnt}>
          {["am", "ru", "en"].map((lang, index) => (
            <BranchForm
              key={index}
              language={lang}
              name={`name_${lang}`}
              control={control}
              className={styles.address_and_name_inp}
            />
          ))}
        </div>

        <MainButton
          onClick={onSubmit}
          variant={"contained"}
          startIcon={<EditIcon />}
          className={styles.btn_create}
        >
          Edit
        </MainButton>
      </div>
    </div>
  );
};

export default EditBranch;
