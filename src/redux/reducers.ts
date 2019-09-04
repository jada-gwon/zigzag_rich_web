import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import * as actions from './actions';
import { ChatRoom, Message } from '../models';
import { loginUserMock } from '../mock';

const chats = createReducer(
  {
    [actions.fetchInitailDataSuccess as any]: (_, paylodad) => paylodad.chats,
    [actions.selectChatWithLoginUser as any]: (state, payload) => {
      const targetIndex = state.findIndex(
        (chat: ChatRoom) => chat.id === payload.chatId,
      );
      return [
        ...state.slice(0, targetIndex),
        {
          ...(state[targetIndex] as object),
          unReadMessageCount: 0,
        },
        ...state.slice(targetIndex + 1),
      ];
    },
    [actions.createMessage as any]: (state, payload) => {
      const targetIndex = state.findIndex(
        (chat: ChatRoom) => chat.id === payload.chatId,
      );
      return [
        ...state.slice(0, targetIndex),
        {
          ...(state[targetIndex] as object),
          lastMessage: {
            contents: payload.contents,
            contentsType: payload.contentsType,
            sentAt: payload.sentAt,
          },
        },
        ...state.slice(targetIndex + 1),
      ];
    },
  },
  [],
);

const users = createReducer(
  {
    [actions.fetchInitailDataSuccess as any]: (_, paylodad) => paylodad.users,
  },
  [],
);

const messages = createReducer(
  {
    [actions.selectChatWithLoginUser as any]: (state: Message[], payload) =>
      state.map((message) => ({
        ...message,
        readBy:
          payload.chatId === message.chatId
            ? [...message.readBy, payload.loginUserId]
            : message.readBy,
      })),
    [actions.fetchMessagesSuccess as any]: (state, payload) => [
      ...state,
      ...payload,
    ],
    [actions.createMessage as any]: (state, payload) => [...state, payload],
    [actions.setImageProgress as any]: (state: Message[], payload) => {
      const targetIndex = state.findIndex((m) => m.id === payload.messageId);
      if (targetIndex == null) {
        return state;
      }
      return [
        ...state.slice(0, targetIndex),
        {
          ...state[targetIndex],
          imageProgress: payload.imageProgress,
        },
        ...state.slice(targetIndex + 1),
      ];
    },
    [actions.requestSendMessage as any]: (state: Message[], payload) => {
      const targetIndex = state.findIndex((m) => m.id === payload.messageId);
      if (targetIndex == null) {
        return state;
      }
      return [
        ...state.slice(0, targetIndex),
        {
          ...state[targetIndex],
          fetching: true,
        },
        ...state.slice(targetIndex + 1),
      ];
    },
    [actions.requestSendMessageSuccess as any]: (state: Message[], payload) => {
      const targetIndex = state.findIndex((m) => m.id === payload.messageId);
      if (targetIndex == null) {
        return state;
      }
      return [
        ...state.slice(0, targetIndex),
        {
          ...state[targetIndex],
          fetching: false,
          id: payload.newId,
          createAt: payload.createAt,
        },
        ...state.slice(targetIndex + 1),
      ];
    },
  },
  [],
);

const loginUser = createReducer({}, loginUserMock);
const errors = createReducer(
  {
    [actions.pushError as any]: (state: string[], payload) => [
      payload,
      ...state,
    ],
    [actions.popError as any]: (state: string[]) => state.slice(1),
  },
  [],
);

const load = createReducer(
  {
    [actions.fetchInitailDataSuccess as any]: () => true,
  },
  false,
);

const chatApp = combineReducers({
  loginUser,
  chats,
  users,
  messages,
  errors,
  load,
});

export default chatApp;
