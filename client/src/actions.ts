import { AppEvents, FilterReducerEvents } from "./events";

export interface IAction {
  type: AppEvents | FilterReducerEvents;
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


