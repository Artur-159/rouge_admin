import React from "react";

import styles from "../../product.module.scss";
const ProductDetails = ({ product }) => {
  return (
    <div className={styles.product_details}>
      {Object.entries(product).map(([key, value]) => (
        <div key={key} className={styles.product_field}>
          <strong>{key}:</strong> {value ? value.toString() : "no data"}
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
