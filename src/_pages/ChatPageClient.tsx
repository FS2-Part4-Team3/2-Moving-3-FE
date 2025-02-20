import ChatContent from '@/components/section/ChatContent';
import ChatList from '@/components/section/ChatList';

export default function ChatPageClient() {
  return (
    <div className="flex">
      <ChatList />
      <ChatContent />
    </div>
  );
}
