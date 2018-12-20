import { List } from 'immutable';
import { MESSAGE_SENDER, SESSION_NAME } from 'constants';

import {
    createQuickReply,
    createNewMessage,
    createLinkSnippet,
    createVideoSnippet,
    createImageSnippet,
    createComponentMessage,
    storeMessageTo,
    getLocalSession,
    publishEvent
} from './helper';

import * as actionTypes from '../actions/actionTypes';

export default function (storage,observer) {

  const initialState = List([]);

  return function reducer(state = initialState, action) {
    const storeMessage = storeMessageTo(storage);
    switch (action.type) {
      // Each change to the redux store's message list gets recorded to storage
      case actionTypes.ADD_NEW_USER_MESSAGE: {
        return storeMessage(state.push(createNewMessage(action.text, MESSAGE_SENDER.CLIENT)))
      }
      case actionTypes.ADD_NEW_RESPONSE_MESSAGE: {
        const newState = storeMessage(state.push(createNewMessage(action.text, MESSAGE_SENDER.RESPONSE)));
        publishEvent(observer,actionTypes.BOT_MESSAGE_RECEIVED,newState.size);
        return newState;
      }
      case actionTypes.ADD_NEW_LINK_SNIPPET: {
        const newState =storeMessage(state.push(createLinkSnippet(action.link, MESSAGE_SENDER.RESPONSE)));
        publishEvent(observer,actionTypes.BOT_MESSAGE_RECEIVED,newState.size);
        return newState;
      }
      case actionTypes.ADD_NEW_VIDEO_VIDREPLY: {
        const newState = storeMessage(state.push(createVideoSnippet(action.video, MESSAGE_SENDER.RESPONSE)));
        publishEvent(observer,actionTypes.BOT_MESSAGE_RECEIVED,newState.size);
        return newState;
      }
      case actionTypes.ADD_NEW_IMAGE_IMGREPLY: {
        const newState = storeMessage(state.push(createImageSnippet(action.image, MESSAGE_SENDER.RESPONSE)));
        publishEvent(observer,actionTypes.BOT_MESSAGE_RECEIVED,newState.size);
        return newState;
      }
      case actionTypes.ADD_QUICK_REPLY: {
        const newState = storeMessage(state.push(createQuickReply(action.quickReply, MESSAGE_SENDER.RESPONSE)));
        publishEvent(observer,actionTypes.BOT_MESSAGE_RECEIVED,newState.size);
        return newState;
      }
      case actionTypes.ADD_COMPONENT_MESSAGE: {
        return storeMessage(state.push(createComponentMessage(action.component, action.props, action.showAvatar)));
      }
      case actionTypes.SET_QUICK_REPLY: {
        return storeMessage(state.setIn([action.id, 'chosenReply'], action.title));
      }
      case actionTypes.INSERT_NEW_USER_MESSAGE: {
        return storeMessage(state.insert(action.index, createNewMessage(action.text, MESSAGE_SENDER.CLIENT)));
      }
      case actionTypes.DROP_MESSAGES: {
        return storeMessage(initialState)
      }
      // Pull conversation from storage, parsing as immutable List
      case actionTypes.PULL_SESSION: {
        const localSession = getLocalSession(storage, SESSION_NAME);
        if (localSession) {
          return List(localSession.conversation);
        } else {
          return state
        }
      }
      default:
        return state;
    }
  }
}
