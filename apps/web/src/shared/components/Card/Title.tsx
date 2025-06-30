import { Text } from "@puzzlepop2/react-components-layout";

interface Props {
  text: string;
}

export default function Title(props: Props) {
  const { text } = props;

  return (
    <Text
      style={{
        width: "25vw",
      }}
      className="ellipsis"
      size="sm"
      bold
    >
      {text}
    </Text>
  );
}
