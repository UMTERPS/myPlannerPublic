import { LAYOUT_UPDATED } from './actionTypes';

export function updateLayout(layout) {
  return { type: LAYOUT_UPDATED, layout };
}
