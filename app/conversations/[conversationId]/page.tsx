import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Body from "@/components/conversations/Body";
import Header from "@/components/conversations/Header";
import Form from "@/components/conversations/Form";
interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div>
        <p>NO MESSAGES</p>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className=" bg-gray-700 h-full min-h-[400px] min-w-[400px] p-3">
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </div>
  );
};

export default ConversationId;
