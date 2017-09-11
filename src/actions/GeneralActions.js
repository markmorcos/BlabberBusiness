import { PROP_CHANGED } from './types';

export const propChanged = (key, value) => {
  return { type: PROP_CHANGED, payload: { key, value } };
};
