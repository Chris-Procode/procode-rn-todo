import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Archive, House } from 'lucide-react-native';

import { ArchiveScreen, HomeScreen } from './screens';
import EditTodoButton from '../components/EditTodoButton';
import { HomeScreens } from './screens/Screens';

export const HomeNavigator = createBottomTabNavigator({
  screens: {
    [HomeScreens.Home]: {
      screen: HomeScreen,
      options: {
        headerRight: () => {
          return <EditTodoButton />;
        },
        tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
      },
    },
    [HomeScreens.Archive]: {
      screen: ArchiveScreen,
      options: {
        tabBarIcon: ({ color, size }) => <Archive color={color} size={size} />,
      },
    },
  },
  screenOptions: {
    headerRightContainerStyle: { paddingRight: 12 },
    headerLeftContainerStyle: { paddingLeft: 12 },
  },
});
