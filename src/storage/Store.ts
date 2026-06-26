import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import Reducer from './Reducer';

/**
 * The Redux store, configured with the combined persisted reducer.
 * `serializableCheck` is disabled to allow redux-persist's non-serializable
 * actions (e.g. FLUSH, REHYDRATE) to pass through without warnings.
 */
const Store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings about non-serializable values
    }),
});

/**
 * The persistor tied to the Store, used by `PersistGate` to delay rendering
 * until the persisted state has been rehydrated.
 */
const StorePersistor = persistStore(Store);

export { Store, StorePersistor };

/** The shape of the entire Redux state tree, derived from the store's reducer. */
export type RootState = ReturnType<typeof Store.getState>;

/** The dispatch type of the store, used for typed dispatch calls. */
export type AppDispatch = typeof Store.dispatch;
