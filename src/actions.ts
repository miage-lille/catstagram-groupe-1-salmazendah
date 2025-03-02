import { success } from './api';
import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `https://pixabay.com/api/?key=49091144-5621e66304b64d4da0d10510e&per_page=${counter}&q=cat`,
});

export const fetchCatsCommit =  (payload: Picture[]): FetchCatsCommit => ({ 
  type: 'FETCH_CATS_COMMIT',
  payload, });


export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });

export const selectPicture = (picture: Picture) => ({
  type: 'SELECT_PICTURE' as const,
  picture,
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL' as const,
});
