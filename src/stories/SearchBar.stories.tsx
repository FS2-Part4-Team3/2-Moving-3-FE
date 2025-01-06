import SearchBar from "@/components/common/searchbar/SearchBar";
import type { SearchBarProps } from "@/interfaces/CommonComp/SearchBarInterface";
import type { StoryFn } from "@storybook/react";

export default {
  title: "Components/SearchBar/SearchBar",
  component: SearchBar,
};

const Template: StoryFn<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Left = Template.bind({});
Left.args = {
  type: "left",
};

export const Right = Template.bind({});
Right.args = {
  type: "right",
};
