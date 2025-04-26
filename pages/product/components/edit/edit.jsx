import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import MainButton from "../../../../components/button/button";
import CheckboxGroup from "../../../../components/forms/product-form/checkboxGroup";
import Image from "../../../../components/uploads/image/image";
import VideosImages from "../../../../components/uploads/videos-images/videos-images";
import { checkboxOptions } from "../../../../constant/product";
import { ProductAPI } from "../../../../services/product";
import {
  isImageSlice,
  isListVideosImages,
} from "../../../../store/image/slice";
import { isStatusText } from "../../../../store/product/slice";
import Toast from "../../../../helpers/status-text";
import EditIcon from "@mui/icons-material/Edit";
import ProductDetails from "../details/details";
import Back from "../../../../components/back-btn/back-btn";

import styles from "../../product.module.scss";

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();

  const { status, oneProduct } = useSelector((state) => state.product);
  const { image, listVideosImages } = useSelector((state) => state.image);

  const defaultValues = { ...oneProduct };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(ProductAPI.getOneProduct(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    reset(oneProduct);
    dispatch(isListVideosImages(oneProduct.images));
    dispatch(isImageSlice(oneProduct.image));
  }, [reset, dispatch, oneProduct]);

  const onSubmit = handleSubmit((data) => {
    data.image = image?.path;
    data.images = listVideosImages ? listVideosImages : data.images;
    dispatch(ProductAPI.putUpdateProduct(data));
  });

  useEffect(() => {
    if (status) {
      Toast.success("Successfully done", false, {
        onClose: () => {
          navigate("/product");
          dispatch(isStatusText(false));
          dispatch(isImageSlice(false));
        },
      });
    }
  }, [status, dispatch, navigate]);
  return (
    <>
      <Back />
      <h2 className={styles.product_name}>{oneProduct.product_name}</h2>
      <div className={styles.checkbox_images}>
        <div className={styles.img_group}>
          <div>
            <i>Image for Product</i>
            <Image
              name="image"
              status={status}
              control={control}
              image={image && image.path}
              error={errors?.image_for_home?.message}
            />
          </div>
          <div>
            <i>Images/Videos Product page</i>
            <VideosImages
              name="images"
              status={status}
              control={control}
              error={errors.images?.message}
              className={styles.videos_images}
              images={listVideosImages && listVideosImages}
            />
          </div>
        </div>

        <CheckboxGroup
          control={control}
          items={checkboxOptions}
          className={styles.check_box_group}
        />
      </div>
      <MainButton
        onClick={onSubmit}
        variant={"contained"}
        startIcon={<EditIcon />}
        className={styles.btn_create}
      >
        Edit
      </MainButton>
      <ProductDetails product={oneProduct} />
    </>
  );
};

export default Edit;
