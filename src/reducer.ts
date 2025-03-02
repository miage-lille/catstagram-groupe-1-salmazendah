import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type';
import fakeData from './fake-datas.json';
import { Option, none, some } from 'fp-ts/Option';
import { loop } from 'redux-loop';
import { cmdFetch } from './commands';
import { fetchCatsCommit, fetchCatsRequest } from './actions';
import { Loading, Success, Failure } from './types/api.type';
import { loading, failure, success } from './api'

export type State = {
  counter: number;
  pictures: Loading | Success<Picture[]> | Failure;
  pictureSelected: Option<Picture>;
  error: Error | null;
};

export const defaultState: State = {
  counter: 3,
  pictures:loading(),
  pictureSelected: none, //aucune image sélectionnée par défaut
  error: null,
};

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return loop(
        {
          ...state,
          counter: state.counter + 1,
        },
        cmdFetch(fetchCatsRequest(state.counter + 1))
      );
    case 'DECREMENT':
      return loop(
        {
          ...state,
          counter: Math.max(3, state.counter - 1),
        },
        cmdFetch(fetchCatsRequest(Math.max(3, state.counter - 1))) 
      );
    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: some(action.picture) };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: none };
    case 'FETCH_CATS_REQUEST':
      return loop(
        {
          ...state,
          pictures: loading(),
        },
        cmdFetch(fetchCatsRequest(state.counter))
      );
    case 'FETCH_CATS_COMMIT':
      return {
        ...state,
        pictures: success(action.payload),
      };
    case 'FETCH_CATS_ROLLBACK':
      return {
        ...state,
        pictures: failure(action.error.message), // Met à jour l'état en cas d'erreur
        error: action.error,
      };
    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.pictures;
export const getSelectedPicture = (state: State) => state.pictureSelected;

export default compose(liftState, reducer);
