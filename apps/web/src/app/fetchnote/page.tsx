import "@puzzlepop2/themes/themes.css";
import { Box } from "@puzzlepop2/react-components-layout";
import { sum } from "@puzzlepop2/game";

export default function FetchNotePage() {
  return (
    <>
      <Box>FetchNotePage</Box>
      {/* <Box
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "var(--orange-400)",
        }}
      >
        @puzzlepop2/react-components-layout 의 Box
      </Box> */}
      <div>이건 core에서 가져온거에요.. sum(1, 2) = {sum(1, 2)}</div>
    </>
  );
}
