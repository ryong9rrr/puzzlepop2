import { IoMdRefresh } from "react-icons/io";
import styles from "./refresh-button.module.css";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
}

export const RefreshButton = (props: Props) => {
  const { onClick, isLoading = false } = props;

  if (isLoading) {
    return <span className={styles["loading-spinner"]} />;
  }

  return <IoMdRefresh className={styles["refresh-icon"]} onClick={onClick} />;
};
