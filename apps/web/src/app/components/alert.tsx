import Image from "next/image";
import clsx from "clsx";
import "animate.css";
import { Flex } from "@puzzlepop2/react-components-layout";
import styles from "../page.module.css";

export const Title = () => {
  return (
    <Flex justify="center">
      <div className={clsx(styles.alertImageContainer, "animate__animated animate__bounceIn")}>
        <Image
          src="/road-work.png"
          alt="https://www.flaticon.com/kr/free-icons/"
          layout="responsive"
          width={1}
          height={1}
        />
      </div>
    </Flex>
  );
};
