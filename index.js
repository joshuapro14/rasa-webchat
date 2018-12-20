import React from 'react';
import ReactDOM from 'react-dom';
import {
  Widget, toggleChat, openChat, closeChat, showChat,
  hideChat, isOpen, isVisible, messageSize, getMessages,
  BOT_MESSAGE_RECEIVED, CHAT_OPENED, CHAT_CLOSED
} from './index_for_react_app';

const plugin = {
  init: (args) => {

    ReactDOM.render(
      <Widget
        socketUrl={args.socketUrl}
        socketPath={args.socketPath}
        interval={args.interval}
        initPayload={args.initPayload}
        title={args.title}
        subtitle={args.subtitle}
        customData={args.customData}
        inputTextFieldHint={args.inputTextFieldHint}
        connectingText={args.connectingText}
        profileAvatar={args.profileAvatar}
        showCloseButton={args.showCloseButton}
        fullScreenMode={args.fullScreenMode}
        badge={args.badge}
        params={args.params}
        embedded={args.embedded}
        openLauncherImage={args.openLauncherImage}
        closeImage={args.closeImage}
        observer={args.observer}
      />, document.querySelector(args.selector)
    );
  }
};

export {
  plugin as default,
  Widget,
  toggleChat as toggle,
  openChat as open,
  closeChat as close,
  showChat as show,
  hideChat as hide,
  isOpen,
  isVisible,
  messageSize,
  getMessages,
  BOT_MESSAGE_RECEIVED,
  CHAT_OPENED,
  CHAT_CLOSED
};
