import MovingTypeFilterDropdown from "@/components/dropdown/MovingTypeFilterDropdown";
import type { MediaTypeFilterDropdownProps } from "@/interfaces/Dropdown/MediaTypeFilterDropdownInterface";
import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import button from "@/../public/assets/common/dropdown/dropdown-open-button.svg";
import Image from "next/image";

export default {
  title: "Components/Dropdown/MediaTypeFilterDropdown",
  component: MovingTypeFilterDropdown,
};

const Template: StoryFn<MediaTypeFilterDropdownProps> = (args) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Image
        src={button}
        alt="button"
        width={32}
        height={32}
        onClick={handleClick}
        className="lg:hidden sm:block"
      />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MovingTypeFilterDropdown {...args} onClick={handleClick} />
          </div>
        </div>
      )}
      <div className="lg:block sm:hidden">
        <MovingTypeFilterDropdown {...args} onClick={handleClick} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
