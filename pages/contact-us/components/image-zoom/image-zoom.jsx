import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./image-zoom.module.scss";
const ImageZoom = ({ srcPath, isModalVisible, setIsModalVisible }) => {
  const [isLandscape, setIsLandscape] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsModalVisible(true);
  };

  const handleImageLoad = (e) => {
    const img = e.target;
    setIsLandscape(img.naturalWidth > img.naturalHeight);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <>
      <img
        width={200}
        height={200}
        alt="contact"
        loading="lazy"
        className={styles.image_preview}
        onClick={() => handleImageClick(srcPath)}
        src={process.env.REACT_APP_BASE_URL_IMG + srcPath}
      />
      {isModalVisible && selectedImage === srcPath && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <ClearIcon onClick={closeModal} className={styles.close_icon} />
            <img
              onLoad={handleImageLoad}
              alt="Full screen contact"
              src={process.env.REACT_APP_BASE_URL_IMG + selectedImage}
              className={`${styles.fullscreen_img} ${
                isLandscape ? styles.landscape_img : styles.portrait_img
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageZoom;
