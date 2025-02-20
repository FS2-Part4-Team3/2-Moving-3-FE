import ChatTab from '../Tabs/ChatTab';
import ChatInput from '../inputs/ChatInput';

export default function ChatContent() {
  return (
    <div className="flex flex-col">
      <div className="w-[calc(100vw-45rem)]">
        <ChatTab />
      </div>
      <div className="bg-background-200 w-[calc(100vw-45rem)] h-screen lg:px-[2.4rem]">
        <div></div>
        <ChatInput />
      </div>
    </div>
  );
}
