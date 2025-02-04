import Image from "next/image";
import { Flex } from "@puzzlepop2/react-components-layout";

type ImageCardProps = {
  src: string;
  title: string;
  description: string;
};

export const ImageCard = (props: ImageCardProps) => {
  const { src, title, description } = props;

  return (
    <Flex direction="column" style={{ border: "1px solid black" }} basis={300} grow={1}>
      <div>
        <Image src={src} alt={title} width={300} height={200} objectFit="cover" />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Flex>
  );
};
