import { Picture } from './types/picture.type';
import { Loading, Success, Failure } from './types/api.type';

export const loading = (): Loading => ({ kind: 'LOADING' });
export const success = (payload: Picture[]): Success<Picture[]> => ({ kind: 'SUCCESS', pictures: payload });
export const failure = (error: string): Failure => ({ kind: 'FAILURE', error });