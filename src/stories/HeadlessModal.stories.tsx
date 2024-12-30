import { ModalWrapper } from "@/components/common/headless/Modal";
import type { StoryFn } from "@storybook/react";

export default {
  title: "Components/Headless/ModalWrapper",
  component: ModalWrapper,
};

export const Default: StoryFn = () => {
  return (
    <ModalWrapper onClose={() => console.log("모달 닫기")}>
      <ModalWrapper.Header>모달 제목</ModalWrapper.Header>
      <ModalWrapper.Content>
        <p>모달 내용이 여기에 들어갑니다.</p>
      </ModalWrapper.Content>
      <ModalWrapper.Footer isDisabled={true}>버튼 확인</ModalWrapper.Footer>
    </ModalWrapper>
  );
};
