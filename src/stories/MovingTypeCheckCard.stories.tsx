import type { StoryFn } from '@storybook/react';
import { useState } from 'react';
import MovingTypeCheckCard from '@/components/cards/MovingTypeCheckCard';
import type { MovingTypeCheckCardProps } from '@/interfaces/Card/MovingTypeCheckCardInterface';

export default {
  title: 'Components/Cards/MovingTypeCheckCard',
  component: MovingTypeCheckCard,
  argTypes: {
    initialMovingType: {
      control: 'text',
      description: '초기 선택된 이동 타입',
    },
    setMovingType: { action: 'setMovingType', description: '선택된 이동 타입을 설정하는 함수' },
    setIsMovingType: { action: 'setIsMovingType', description: '이동 타입 설정 완료 여부를 설정하는 함수' },
  },
};

const Template: StoryFn<MovingTypeCheckCardProps> = args => {
  const [movingType, setMovingType] = useState<string>(args.initialMovingType);
  const [isMovingTypeSet, setIsMovingTypeSet] = useState(false);

  return (
    <MovingTypeCheckCard
      {...args}
      setMovingType={type => {
        setMovingType(type);
        args.setMovingType(type);
      }}
      setIsMovingType={isSet => {
        setIsMovingTypeSet(isSet);
        args.setIsMovingType(isSet);
      }}
      initialMovingType={movingType}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  initialMovingType: '',
};
