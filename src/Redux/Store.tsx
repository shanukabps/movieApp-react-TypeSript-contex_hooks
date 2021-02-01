import React, { useReducer } from "react";

export interface IState {
  episodes: Array<any>;
  favourits: Array<any>;
}

export interface IAction {
  type: string;
  payload: Array<any>;
}

const initialSate: IState = {
  episodes: [],
  favourits: [],
};

export const Store = React.createContext < IState|any>(initialSate);

function reducer(state: IState, action: IAction): IState|any {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    case 'ADD_FAV':
       return {...state,favourits:[...state.favourits,action.payload]}
  }
  return state;
}
 
export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialSate);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
