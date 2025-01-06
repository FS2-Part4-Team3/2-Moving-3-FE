import MediaTypeFilterDropdown from "@/components/dropdown/MediaTypeFilterDropdown";
import type { MediaTypeFilterDropdownProps } from "@/interfaces/Dropdown/MediaTypeFilterDropdownInterface";
import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import button from "@/../public/assets/common/dropdown/dropdown-open-button.svg";
import Image from "next/image";

export default {
  title: "Components/Dropdown/MediaTypeFilterDropdown",
  component: MediaTypeFilterDropdown,
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
      />
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <MediaTypeFilterDropdown {...args} onClick={handleClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
