import TextInput from "../../text-input/text-input";
import Image from "../../../components/uploads/image/image";
import VideosImages from "../../uploads/videos-images/videos-images";
import CheckboxGroup from "./checkbox-group";
import { CHECKBOX_ITEMS } from "../../../constant/brand";

import styles from "../../../pages/brands/brands.module.scss";

const BrandFormFields = ({
  control,
  errors,
  status,
  image,
  images,
  checked,
}) => {
  return (
    <div>
      <div className={styles.box_inp}>
        <TextInput
          name="name"
          control={control}
          error={errors.name?.message}
          placeholder="Brand Name"
          className={styles.brand_name}
        />
        <CheckboxGroup
          control={control}
          items={CHECKBOX_ITEMS}
          checked={{ ...checked }}
          className={styles.checkboxGroup}
        />
      </div>

      <div className={styles.images_box}>
        <div>
          <h2>Small image</h2>
          <Image
            status={status}
            control={control}
            name="small_image"
            image={image?.path}
            className={styles.small_image}
            error={errors?.small_image?.message}
          />
        </div>
        <div>
          <h2>Brand banner image</h2>
          <VideosImages
            name="image"
            status={status}
            images={images}
            multiple={false}
            control={control}
            error={errors?.image?.message}
            className={styles.banner_image}
            disabled={images?.length ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandFormFields;
