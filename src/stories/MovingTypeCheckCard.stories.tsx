import MovingTypeCheckCard from "@/components/cards/MovingTypeCheckCard";
import type { StoryFn } from "@storybook/react";

export default {
  title: "Components/Cards/MovingTypeCheckCard",
  component: MovingTypeCheckCard,
};

const Template: StoryFn = () => {
  return <MovingTypeCheckCard />;
};

export const Default = Template.bind({});
