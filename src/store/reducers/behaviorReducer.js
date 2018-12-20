import { Map } from 'immutable';
import * as actionTypes from '../actions/actionTypes';
import { SESSION_NAME } from 'constants';
import { getLocalSession, storeParamsTo, publishEvent } from './helper';

export default function (inputFieldTextHint, connectingText, storage, observer)) {
  const initialState = Map({
    connected: false,
    initialized: false,
    isChatVisible: true,
    isChatOpen: false,
    disabledInput: true,
    inputFieldTextHint,
    connectingText
  });

  return function reducer(state = initialState, action) {
    const storeParams = storeParamsTo(storage);
    switch (action.type) {
      // Each change to the redux store's behavior Map gets recorded to storage
      case actionTypes.SHOW_CHAT: {
        return storeParams(state.update('isChatVisible', isChatVisible => true));
      }
      case actionTypes.HIDE_CHAT: {
        return storeParams(state.update('isChatVisible', isChatVisible => false));
      }
      case actionTypes.TOGGLE_CHAT: {
        const newState = storeParams(state.update('isChatOpen', isChatOpen => !isChatOpen));
        if(newState.get("isChatOpen")){
          publishEvent(observer,actionTypes.CHAT_OPENED,newState.get("isChatOpen"));
        }else{
          publishEvent(observer,actionTypes.CHAT_CLOSED,newState.get("isChatOpen"));
        }
        return newState;
      }
      case actionTypes.OPEN_CHAT: {
        const newState = storeParams(state.update('isChatOpen', isChatOpen => true));
        publishEvent(observer,actionTypes.CHAT_OPENED,newState.get("isChatOpen"));
        return newState;
      }
      case actionTypes.CLOSE_CHAT: {
        const newState = storeParams(state.update('isChatOpen', isChatOpen => false));
        publishEvent(observer,actionTypes.CHAT_CLOSED,newState.get("isChatOpen"));
        return newState;
      }
      case actionTypes.TOGGLE_INPUT_DISABLED: {
        return storeParams(state.update('disabledInput', disabledInput => !disabledInput));
      }
      case actionTypes.CHANGE_INPUT_FIELD_HINT: {
        return storeParams(state.set('inputFieldTextHint', action.hint));
      }
      case actionTypes.CONNECT: {
        return storeParams(state.set('connected', true).set('disabledInput', false));
      }
      case actionTypes.DISCONNECT: {
        return storeParams(state.set('connected', false).set('disabledInput', true));
      }
      case actionTypes.INITIALIZE: {
        return storeParams(state.set('initialized', true));
      }
      // Pull params from storage to redux store
      case actionTypes.PULL_SESSION: {
        const localSession = getLocalSession(storage, SESSION_NAME);
        if (localSession && localSession.params) {
          return Map(localSession.params);
        } else {
          return state
        }
      }
      default:
        return state;
    }
  };
}
