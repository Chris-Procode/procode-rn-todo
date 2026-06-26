import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Checkbox } from 'expo-checkbox';
import { useCallback, useLayoutEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { RootScreens } from './Screens';
import EditTodoButton from '../../components/EditTodoButton';
import { useTodo } from '../../storage/TodoHooks';
import { RootParamList } from '../RootNavigator';

type Props = NativeStackScreenProps<RootParamList, RootScreens.Todo>;

const TodoScreen = ({ route }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const {
    todo,
    completeTodo,
    incompleteTodo,
    archiveTodo,
    unarchiveTodo,
    deleteTodo,
  } = useTodo(route.params.todoId);

  const isComplete = todo?.completedAt !== undefined;
  const isArchived = todo?.archivedAt !== undefined;

  const renderEditButton = useCallback(() => {
    if (!todo) {
      return null;
    }
    return <EditTodoButton todoId={todo.id} />;
  }, [todo]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderEditButton,
    });
  }, [navigation, renderEditButton]);

  function toggleTodoCompletion(isComplete: boolean) {
    if (isComplete) {
      completeTodo(todo!);
      return;
    }
    incompleteTodo(todo!);
  }

  function toggleArchived(isArchived: boolean) {
    if (isArchived) {
      archiveTodo(todo!);
      return;
    }
    unarchiveTodo(todo!);
  }

  function permanentlyDelete() {
    deleteTodo(todo!);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.container, styles.panel]}>
        <Text style={styles.title}>{todo?.title}</Text>
        <Text style={styles.description}>{todo?.description}</Text>
      </View>
      <View style={[styles.actions, styles.panel]}>
        <View style={styles.actionContainer}>
          <Text style={styles.title}>{'Completed?'}</Text>
          <Checkbox
            hitSlop={15}
            value={isComplete}
            onValueChange={toggleTodoCompletion}
            color={'blue'}
          />
        </View>
        <View style={styles.actionContainer}>
          <Text style={styles.title}>{'Archived?'}</Text>
          <Checkbox
            hitSlop={15}
            value={isArchived}
            onValueChange={toggleArchived}
            color={'blue'}
          />
        </View>
        <TouchableOpacity onPress={permanentlyDelete} style={styles.delete}>
          <Text style={styles.deleteText}>{'Delete'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  panel: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  actions: {
    gap: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 16,
  },
  delete: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TodoScreen;
