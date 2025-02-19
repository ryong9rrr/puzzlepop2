import { Flex, Text, Spacing } from "@puzzlepop2/react-components-layout";
import { Header } from "../components/Header";

export const PuzzlesPage = () => {
  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      window.alert("파일을 선택해주세요.");
      return;
    }
    const file = event.target.files[0];
    const form = new FormData();
    form.append("file", file);
    window
      .fetch("http://localhost:8080/rest-server/puzzles/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      })
      .then(response => {
        if (response.ok) {
          window.alert("성공적으로 업로드 되었습니다.");
        } else {
          window.alert("업로드에 실패했습니다.");
        }
      });
  };

  return (
    <>
      <Header />
      <Flex direction="column">
        <Text bold>/puzzles 에 대한 api를 테스트합니다.</Text>
        <Spacing size={20} />
        <input id="puzzle-upload-input" type="file" accept="image/*" onChange={handleUploadFile} />
        <Text>설명 : 퍼즐 이미지를 업로드 합니다.</Text>
        <Spacing size={20} />
      </Flex>
    </>
  );
};
