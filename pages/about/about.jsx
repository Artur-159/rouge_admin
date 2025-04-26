import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AboutAPI } from "../../services/about";
import { isStatusText } from "../../store/about/slice";
import Edit from "./components/edit/edit";
import Create from "./components/create/create";

import styles from "./about.module.scss";

const About = () => {
  const dispatch = useDispatch();
  const { status, data } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(AboutAPI.getAbout());
    dispatch(isStatusText(false));
  }, [dispatch, status]);

  return (
    <div className={styles.create_edit}>{data?.id ? <Edit /> : <Create />}</div>
  );
};

export default About;
