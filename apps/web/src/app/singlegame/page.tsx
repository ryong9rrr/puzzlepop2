import * as colors from "@/theme/colors";
import { Box } from "@/shared/components/Box";
import { Spacing } from "@/shared/components/Spacing";
import { Flex } from "@/shared/components/Flex";

const values = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

export default function SingleGamePage() {
  return (
    <>
      <Flex>
        {values.map(value => {
          return (
            <>
              <Box
                style={{
                  width: "100px",
                  height: "100px",
                  //backgroundColor: colors.orange[value],
                }}
              >
                {value}
              </Box>
              <Spacing size={1} />
            </>
          );
        })}
      </Flex>
      <Flex>
        {values.map(value => {
          return (
            <>
              <Box
                style={{
                  width: "100px",
                  height: "100px",
                  //backgroundColor: colors.lavender[value],
                }}
              >
                {value}
              </Box>
              <Spacing size={1} />
            </>
          );
        })}
      </Flex>
      <Flex>
        {values.map(value => {
          return (
            <>
              <Box
                style={{
                  width: "100px",
                  height: "100px",
                  //backgroundColor: colors.lightYellow[value],
                }}
              >
                {value}
              </Box>
              <Spacing size={1} />
            </>
          );
        })}
      </Flex>
    </>
  );
}
