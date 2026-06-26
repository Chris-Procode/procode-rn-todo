import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootNavigator } from './src/navigation';
import { Store, StorePersistor } from './src/storage/Store';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <PersistGate persistor={StorePersistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
