import { Link } from "react-router";
import { Flex } from "@puzzlepop2/react-components-layout";
import { Header } from "../components/Header";

export const HomePage = () => {
  return (
    <>
      <Header />
      <Flex direction="column" gap={10}>
        <Link to="/puzzles">/puzzles</Link>
      </Flex>
    </>
  );
};
