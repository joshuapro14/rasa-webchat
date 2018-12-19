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
  ADD_BOT_MESSAGE
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
  ADD_BOT_MESSAGE
};
