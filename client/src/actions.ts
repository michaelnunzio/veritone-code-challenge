import { AppEvents } from "./events";

export interface IAction {
  type: AppEvents;
  payload: any;
}

export const SetAction = (payload: any) => {
  return {
    type: AppEvents.SET_ACTION,
    payload,
  };
};

export const SetShoppingList = (payload: object) => {
    return {
      type: AppEvents.SET_SHOPPING_LIST,
      payload,
    };
  };

export const GetListData = (payload: object) => {
  return {
    type: AppEvents.GET_LIST_DATA,
    payload,
  };
};

export const SetLoadingState = (payload: object) => {
  return {
    type: AppEvents.SET_LOADING_STATE,
    payload,
  };
};


