import { Message } from '../models';
import { getMessageMock } from '../mock';

async function fetchMessages(id: string): Promise<Message[]> {
  return new Promise(function name(resolve, reject) {
    const message = getMessageMock(id);
    if (message.length > 0) {
      resolve(message);
    }
    reject();
  });
}

export default fetchMessages;
