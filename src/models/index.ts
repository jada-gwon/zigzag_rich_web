export enum ContentsType {
  text = 'text',
  image = 'image',
}

export interface User {
  id: string;
  name: string;
  profileImage: string;
}

export interface Message {
  id: string;
  createAt?: Date;
  sentAt: Date;
  contentsType: ContentsType;
  contents: string;
  addresserId: string;
  chatId: string;
  readBy: string[];
}

export interface ChatGroup {
  id: string;
  members: string[];
}

export interface ChatRoom extends ChatGroup {
  lastMessage: Pick<Message, 'contents' | 'sentAt' | 'contentsType'>;
  unReadMessageCount: number;
}

export interface StoreState {
  chats: ChatRoom[];
  users: User[];
  messages: Message[];
  loginUser: User;
  errors: string[];
}

export type InitialData = { chats: ChatRoom[]; users: User[] };
