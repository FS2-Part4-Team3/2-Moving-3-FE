import type { StoryFn } from '@storybook/react';
import { ProfileChips } from '@/components/chips/ProfileChips';
import movingTypes from '@/constants/movingType';
import regions from '@/constants/regions';
import type { User } from '@/interfaces/User/userInterface';
import type { ProfileChipProps } from '@/interfaces/chip/ProfileChipInterface';

export default {
  title: 'Components/Chips/ProfileChips',
  component: ProfileChips,
};

const user = {
  type: 'driver',
};

const Template: StoryFn<ProfileChipProps & { user: User }> = args => <ProfileChips {...args} />;

export const NoRegions = Template.bind({});
NoRegions.args = {
  movingTypes,
  user: {
    type: 'driver', // 유저 타입 정의
  },
};

export const NoMovingType = Template.bind({});
NoMovingType.args = {
  regions,
  user: {
    type: 'driver', // 유저 타입 정의
  },
};
