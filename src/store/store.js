import { createStore, combineReducers, applyMiddleware } from "redux";

import { SESSION_NAME } from 'constants';

import behavior from "./reducers/behaviorReducer";
import messages from "./reducers/messagesReducer";
import { getLocalSession } from './reducers/helper';
import * as actionTypes from './actions/actionTypes';

let store = "call initStore first";

function initStore(hintText, connectingText, socket, storage, observer) {

  const customMiddleWare = (store) => next => (action) => {
    const session_id = (getLocalSession(storage, SESSION_NAME)? getLocalSession(storage, SESSION_NAME).session_id: null);
    switch (action.type) {
      case actionTypes.EMIT_NEW_USER_MESSAGE: {
        socket.emit("user_uttered", { message: action.text, customData: socket.customData, session_id });
      }
      case actionTypes.GET_OPEN_STATE: {
        return store.getState().behavior.get("isChatOpen");
      }
      case actionTypes.GET_VISIBLE_STATE: {
        return store.getState().behavior.get("isChatVisible");
      }
      case actionTypes.MESSAGE_SIZE: {
        console.log("Messages Size called !!");
        console.log("store.getState() "+store.getState());
        console.log("store...messages "+store.getState().messages);
        console.log("store..msg.size "+store.getState().messages.size);
        var sz = store.getState().messages.size
        console.log("type of msgSize : "+(typeof sz))
        return sz;
      }
      case actionTypes.MESSAGES: {
        console.log("get Messages called !!");
        console.log("store.getState() "+store.getState());
        console.log("store...messages "+store.getState().messages);
        console.log("store..msg.size "+store.getState().messages.size);
        return store.getState().messages;
      }
    }

    // console.log('Middleware triggered:', action);
    next(action);
  };
  const reducer = combineReducers({
    behavior: behavior(hintText, connectingText, storage,observer),
    messages: messages(storage,observer)
  });

  /* eslint-disable no-underscore-dangle */
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(customMiddleWare)
  );
  /* eslint-enable */
}

export { initStore, store };
