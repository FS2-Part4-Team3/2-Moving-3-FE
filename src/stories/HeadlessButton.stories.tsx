import { type StoryFn } from "@storybook/react";
import { ButtonWrapper } from "@/components/common/headless/Button";

export default {
  title: "Components/Headless/ButtonWrapper",
  component: ButtonWrapper,
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
};

export const Default: StoryFn = () => {
  return (
    <ButtonWrapper id="default-button" onClick={() => alert("Button Clicked")}>
      <ButtonWrapper.Button>Click Me</ButtonWrapper.Button>
    </ButtonWrapper>
  );
};

export const Disabled: StoryFn = () => {
  return (
    <ButtonWrapper
      id="disabled-button"
      onClick={() => alert("Disabled Button Clicked")}
    >
      <ButtonWrapper.Button disabled>Disabled Button</ButtonWrapper.Button>
    </ButtonWrapper>
  );
};
