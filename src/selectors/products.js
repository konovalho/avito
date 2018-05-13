/* eslint-disable */
import { createSelector } from 'reselect';

import { rootSelector } from './common';

export const productsSelector = createSelector(
  rootSelector,
  ({ products }) => products.data,
);

export const isFirstFetchDataSelector = createSelector(
  rootSelector,
  ({ products }) => products.isFirstFetchData,
);

export const currentProductSelector = id => {
  return createSelector(
    productsSelector,
    products => products.find(item => item.id === id),
  );
};
