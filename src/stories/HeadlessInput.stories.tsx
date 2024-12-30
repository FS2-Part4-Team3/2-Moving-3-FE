import React, { useState } from "react";
import { type StoryFn } from "@storybook/react";
import { InputWrapper } from "@/components/common/headless/Input";

export default {
  title: "Components/Headless/InputWrapper",
  component: InputWrapper,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
  },
};

export const Default: StoryFn = () => {
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      id="default-input"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <InputWrapper.Label className="text-[5rem]">
        Default Label
      </InputWrapper.Label>
      <InputWrapper.Input />
    </InputWrapper>
  );
};

export const Password: StoryFn = () => {
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      id="password-input"
      type="password"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <InputWrapper.Label>Password</InputWrapper.Label>
      <InputWrapper.Input />
    </InputWrapper>
  );
};

export const Email: StoryFn = () => {
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      id="email-input"
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <InputWrapper.Label>Email Address</InputWrapper.Label>
      <InputWrapper.Input />
    </InputWrapper>
  );
};

export const Rounded: StoryFn = () => {
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      id="rounded-input"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <InputWrapper.Label>Rounded Input</InputWrapper.Label>
      <InputWrapper.Input />
    </InputWrapper>
  );
};

export const Large: StoryFn = () => {
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      id="large-input"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <InputWrapper.Label className="block text-sm font-medium text-gray-700">
        Large Input
      </InputWrapper.Label>
      <InputWrapper.Input className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" />
    </InputWrapper>
  );
};

export const Error: StoryFn = () => {
  const [value, setValue] = useState("");

  return (
    <InputWrapper
      id="error-input"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <InputWrapper.Label className="block text-sm font-medium text-gray-700">
        Error Input
      </InputWrapper.Label>
      <InputWrapper.Input className="mt-1 block w-full rounded-md border-red-500 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200" />
      <p className="mt-2 text-sm text-red-600">This field has an error.</p>
    </InputWrapper>
  );
};
