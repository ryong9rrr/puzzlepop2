import { Button } from "@puzzlepop2/react/components";
import { sum } from "@puzzlepop2/core";

export default function FetchNotePage() {
  return (
    <>
      <h1>FetchNotePage</h1>
      <Button>
        이건 @puzzlepop2/react/components 에서 가져온 버튼이에요.. 스타일링은 안했지만
        개발자도구에서 확인해보세요...
      </Button>
      <div>이건 core에서 가져온거에요.. sum(1, 2) = {sum(1, 2)}</div>
    </>
  );
}
