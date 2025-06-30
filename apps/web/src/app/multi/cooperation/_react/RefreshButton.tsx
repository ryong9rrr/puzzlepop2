import { IoMdRefresh } from "react-icons/io";

import MODULE_CSS from "./RefreshButton.module.css";

interface Props {
  onClick?: () => void;
  isLoading?: boolean;
}

export const RefreshButton = (props: Props) => {
  const { onClick, isLoading = false } = props;

  if (isLoading) {
    return <span className={MODULE_CSS["loading-spinner"]} />;
  }

  return <IoMdRefresh className={MODULE_CSS["refresh-icon"]} onClick={onClick} />;
};
