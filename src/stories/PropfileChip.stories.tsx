import { ProfileChips } from "@/components/chips/PropileChips";
import movingTypes from "@/constants/movingType";
import regions from "@/constants/regions";
import type { ProfileChipProps } from "@/interface/chip/ProfileChipInterface";
import type { StoryFn } from "@storybook/react";

export default {
  title: "Components/Chips/ProfileChips",
  component: ProfileChips,
};

const Template: StoryFn<ProfileChipProps> = (args) => (
  <ProfileChips {...args} />
);

export const NoRegions = Template.bind({});
NoRegions.args = {
  regions: [],
  movingTypes,
};

export const NoMovingType = Template.bind({});
NoMovingType.args = {
  regions,
  movingTypes: [],
};
