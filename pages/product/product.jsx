import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isOneProduct, isStatusText } from "../../store/product/slice";
import { isImageSlice, isListVideosImages } from "../../store/image/slice";
import List from "./components/list/list";

const Product = () => {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.product);
  const { offset } = useSelector((state) => state.pagination);

  useEffect(() => {
    dispatch(isImageSlice(false));
    dispatch(isListVideosImages(false));
    dispatch(isStatusText(false));
    dispatch(isOneProduct(false));
  }, [dispatch, status, offset]);

  return (
    <div>
      <h1>Product</h1>
      <div>
        <List />
      </div>
    </div>
  );
};

export default Product;
