import ConnectedWidget from './src';
import {
  addUserMessage,
  addResponseMessage,
  addLinkSnippet,
  addVideoSnippet,
  addImageSnippet,
  addQuickReply,
  renderCustomComponent,
  isOpen,
  isVisible,
  openChat,
  closeChat,
  toggleChat,
  showChat,
  hideChat,
  toggleInputDisabled,
  dropMessages,
  messageSize,
  getMessages
} from './src/store/actions/dispatcher';

import {
  BOT_MESSAGE_RECEIVED,
  CHAT_OPENED,
  CHAT_CLOSED
} from './src/store/actions/actionTypes.js'

export {
  ConnectedWidget as Widget,
  addUserMessage,
  addResponseMessage,
  addLinkSnippet,
  addVideoSnippet,
  addImageSnippet,
  addQuickReply,
  renderCustomComponent,
  isOpen,
  isVisible,
  openChat,
  closeChat,
  toggleChat,
  showChat,
  hideChat,
  toggleInputDisabled,
  dropMessages,
  messageSize,
  getMessages,
  BOT_MESSAGE_RECEIVED,
  CHAT_OPENED,
  CHAT_CLOSED
};
