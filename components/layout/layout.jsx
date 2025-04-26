import Header from "../header/header";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header className={styles.layout_header} />
      <div className={styles.layout_children}> {children} </div>
    </div>
  );
};

export default Layout;
