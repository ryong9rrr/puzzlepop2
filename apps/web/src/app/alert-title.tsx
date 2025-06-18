import Image from "next/image";
import { Flex } from "@puzzlepop2/react-components-layout";
import ROAD_WORK from "../../public/road-work.webp";

export const AlertTitle = () => {
  return (
    <Flex justify="center">
      <div className="animate__animated animate__bounceIn" style={{ width: "6rem" }}>
        <Image
          src={ROAD_WORK}
          alt="https://www.flaticon.com/kr/free-icons/"
          layout="responsive"
          width={1}
          height={1}
        />
      </div>
    </Flex>
  );
};
