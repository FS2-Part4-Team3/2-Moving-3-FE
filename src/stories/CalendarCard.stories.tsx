import CalendarCard from "@/components/cards/CalendarCard";
import type { StoryFn } from "@storybook/react";

export default {
  title: "Components/Cards/CalendarCard",
  component: CalendarCard,
};

const Template: StoryFn = () => {
  return <CalendarCard />;
};

export const Defalut = Template.bind({});
