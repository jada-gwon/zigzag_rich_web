export enum ContentsType {
  text = 'text',
  image = '사진',
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
  fetching: boolean;
  imageProgress?: number;
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
  load: boolean;
}

export type InitialData = { chats: ChatRoom[]; users: User[] };
