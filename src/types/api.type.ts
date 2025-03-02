export type Success<T = any>  = { kind: 'SUCCESS'; pictures: T}; 
export type Loading  = { kind: 'LOADING' };
export type Failure = { kind: 'FAILURE'; error: string };