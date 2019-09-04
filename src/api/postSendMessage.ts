import uuidv4 from 'uuid/v4';
import { ContentsType } from '../models';

type SendMessageRequest = {
  chatId: string;
  contents: string;
  contentsType: ContentsType;
  addresserId: string;
};
type SendMessageResponse = { id: string; createAt: Date };

async function postSendMessage(
  payload: SendMessageRequest,
): Promise<SendMessageResponse> {
  console.log(payload);
  return new Promise(function name(resolve) {
    resolve({
      id: uuidv4(),
      createAt: new Date(),
    });
  });
}

export default postSendMessage;
