import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';
import { Success } from './types/api.type';
import { Picture } from './types/picture.type';

const parsePixabayData = (data: any): Picture[] => {
  return data.hits.map((hit: any) => ({
    previewFormat: hit.previewURL, 
    webFormat: hit.webformatURL,   
    author: hit.user,              
    largeFormat: hit.largeImageURL,
  }));
};

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      return fetch(action.path, {
        method: action.method,
      })
      .then(checkStatus)
      .then((response) => response.json()) // Parse la réponse en JSON
      .then((data) => parsePixabayData(data));
  },
    {
      successActionCreator: fetchCatsCommit, // (equals to (payload) => fetchCatsCommit(payload))
      failActionCreator: fetchCatsRollback, // (equals to (error) => fetchCatsCommit(error))
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};
