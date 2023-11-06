import getMessages from "@/actions/getMessages";

interface Props {
  chatId: string;
}

async function ChatScreen({ chatId }: Props) {
  // implement this in the backend
  // const messages = await getMessages(chatId);
  return <div></div>;
}

export default ChatScreen;
