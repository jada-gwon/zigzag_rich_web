import uuidv4 from 'uuid/v4';
import { Dispatch } from 'redux';
import { createAction } from 'redux-act';
import { InitialData, Message, StoreState, ContentsType } from '../models';
import fetchInitialData from '../api/fetchInitialData';
import fetchMessages from '../api/fetchMessages';
import postSendMessage from '../api/postSendMessage';

export const fetchInitailDataSuccess = createAction(
  'Api request for fetching chat list is succeeded',
  (initialData: InitialData) => initialData,
);

export function fetchingInitailData() {
  return function(dispatch: Dispatch<any>) {
    fetchInitialData().then((data) =>
      dispatch(fetchInitailDataSuccess(data as InitialData)),
    );
  };
}

export const selectChatWithLoginUser = createAction(
  'Select a chat from chat list',
  (chatId: string, loginUserId: string) => ({
    chatId,
    loginUserId,
  }),
);

export function selectChat(chatId: string) {
  return function(dispatch: Dispatch<any>, getStore: () => StoreState) {
    const { loginUser } = getStore();
    dispatch(selectChatWithLoginUser(chatId, loginUser.id));
  };
}

export const fetchMessagesSuccess = createAction(
  'Api request for fetching message list is succeeded',
  (messages: Message[]) => messages,
);

export const pushError = createAction(
  'Push error to stack',
  (message: string) => message,
);

export const popError = createAction('Pop error from stack');

export function fetchingMessages(chatId: string) {
  return async function(dispatch: Dispatch<any>) {
    try {
      const messages = await fetchMessages(chatId);
      dispatch(fetchMessagesSuccess(messages));
    } catch {
      dispatch(pushError('존재하지 않는 대화방입니다.'));
    }
  };
}

export const createMessage = createAction(
  'Create a message and add it to a chat window',
  (message: Message) => message,
);

export const setImageProgress = createAction(
  'Set the image uploader progress bar ratio',
  (messageId: string, imageProgress: number) => ({ messageId, imageProgress }),
);

export const requestSendMessage = createAction(
  'Send api request to send a message',
  (messageId: string) => ({ messageId }),
);

export const requestSendMessageSuccess = createAction(
  'Api request for sending message is succeeded',
  (messageId: string, newId: string, createAt: Date) => ({
    messageId,
    newId,
    createAt,
  }),
);

export function sendMessage(
  chatId: string,
  contents: string,
  contentsType: ContentsType,
) {
  return function(dispatch: Dispatch<any>, getStore: () => StoreState) {
    const {
      loginUser: { id: addresserId },
    } = getStore();
    const message: Message = {
      id: uuidv4(),
      sentAt: new Date(),
      contentsType,
      contents,
      addresserId,
      chatId,
      readBy: [addresserId],
      fetching: false,
      imageProgress: 0,
    };
    dispatch(createMessage(message));
    if (message.contentsType === ContentsType.text) {
      dispatch(requestSendMessage(message.id));
      postSendMessage({ chatId, contents, contentsType, addresserId }).then(
        (data) => requestSendMessageSuccess(message.id, data.id, data.createAt),
      );
    } else {
      // instead of image processing api
      window.setTimeout(() => {
        dispatch(setImageProgress(message.id, 1));
        dispatch(requestSendMessage(message.id));
        postSendMessage({ chatId, contents, contentsType, addresserId }).then(
          (data) =>
            requestSendMessageSuccess(message.id, data.id, data.createAt),
        );
      }, 1000);
    }
  };
}
