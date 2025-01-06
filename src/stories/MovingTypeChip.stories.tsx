import React from "react";
import MovingTypeChips from "@/components/chips/MovingTypeChips";
import type { MovingTypeChipsProps } from "@/interfaces/chip/MovingTypeChipInterface";
import type { StoryFn } from "@storybook/react";

export default {
  title: "Components/Chips/MovingTypeChips",
  component: MovingTypeChips,
};

const Template: StoryFn<MovingTypeChipsProps> = (args) => (
  <MovingTypeChips {...args} />
);

export const Small = Template.bind({});
Small.args = {
  type: "small",
};

export const Home = Template.bind({});
Home.args = {
  type: "home",
};

export const Company = Template.bind({});
Company.args = {
  type: "company",
};

export const Appointment = Template.bind({});
Appointment.args = {
  type: "appointment",
};

export const Waiting = Template.bind({});
Waiting.args = {
  type: "waiting",
};
