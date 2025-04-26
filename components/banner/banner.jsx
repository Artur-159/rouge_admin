import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditBanner from "./components/edit-banner/edit-banner";
import CreateBanner from "./components/create-banner/create-banner";
import { isOneBanner, isStatusText } from "../../store/banner/slice";

const Banner = ({ className }) => {
  const dispatch = useDispatch();
  const { oneBanner } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(isOneBanner(false));
    dispatch(isStatusText(false));
  }, [dispatch]);

  return (
    <div className={className}>
      {oneBanner?.id ? <EditBanner /> : <CreateBanner />}
    </div>
  );
};

export default Banner;
