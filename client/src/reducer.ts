import { AppEvents } from './events';

const initState = {
  shoppingList: [],
};

export function reducer(state = initState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case AppEvents.SET_SHOPPING_LIST:
        return { ...state, shoppingList: action.payload };
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
