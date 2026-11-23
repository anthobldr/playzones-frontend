export interface Message {
  sender: string;
  text: string;
  time: string;
}

export interface ConversationData {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
  unread: number;
  messages: Message[];
}